const handlebars = require(`express-handlebars`);
const express = require(`express`);
const { Server } = require(`socket.io`);
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo');
const passport = require('passport');
const { addLogger, logger } = require('./utils/logger.js');
const { connectDb, configObject } = require('./config/config.js');
const appRouter = require('./routes/general.router.js');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUiExpress = require('swagger-ui-express');
const { initializePassport } = require('./config/passport.config.js');
const handlebarsHelpers = require('handlebars-helpers')();
const eq = handlebarsHelpers.eq;
const configureSocketIO = require('./helpers/socket.io.js');


const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser(`secret`));

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: configObject.mongo_uri,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 15000000000,
    }),
    secret: `secret`,
    resave: true,
    saveUninitialized: true,
  }),
);

initializePassport();
app.use(session({
secret: `secret`
}))
app.use(passport.initialize());
app.use(appRouter);

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Ecommerce Documentation',
      description: 'Api Doc for Ecommerce',
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

connectDb();

app.use(addLogger);

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: {
      eq: eq,
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.engine(`hbs`, handlebars.engine());

const serverHttp = app.listen(port, () => {
  logger.info(`Server is running on port http://localhost:${port}`);
});

const io = configureSocketIO(serverHttp);

module.exports = { app, io };
