const handlebars = require(`express-handlebars`);
const productsRouter = require(`./routes/apis/products.router.js`);
const apicarts = require(`./routes/apis/carts.routes.js`);
const viewsRouter = require(`./routes/views.router.js`);
const userRouter = require('./routes/apis/users.router.js')
const express = require(`express`);
const { Server } = require(`socket.io`);
const { connect } = require('mongoose');
const app = express();
const port = 8080 || process.env.port;

const connectdb = async () => {await connect(`mongodb+srv://nikiamado123:44871024Niki@proyectobackend.zqmzfsc.mongodb.net/project1?retryWrites=true&w=majority`);
console.log(`base de datos conectada`)
}

connectdb()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.engine(`hbs`, handlebars.engine());

app.use(`/api/products`, productsRouter);
app.use(`/api/carts`, apicarts);
app.use('/api/users', userRouter)
app.use('/', viewsRouter);

app.get(`/single`, (req, res) => {
  res.send('archivo subido');
});
app.get('/usuario', (req, res) => {
  res.json({ nombre: 'Julian', edad: 85, apellido: 'Alvarez', correo: 'Julianalv@gmail.com' });
});

const serverHttp = app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});

const socketserver = new Server(serverHttp);
socketserver.on(`connection`, (socket) => {
  console.log('nuevo cliente conectado');

  let arraymsj = [];

  socket.emit(`recibirmensaje`, arraymsj);

  socket.on(`title`, (title) => {
    console.log(title);
    arraymsj.push({ id: socket.id, message: title });
    socketserver.emit('mensaje-cliente', arraymsj);
  });
  socket.on(`description`, (description) => {
    console.log(description);
    arraymsj.push({ description: description });
    socketserver.emit('mensaje-cliente', arraymsj);
  });
  socket.on(`enviardatos`, (title, description) => {
    arraymsj.push({ title: title, description: description });
    socketserver.emit('mensaje', arraymsj);
  });

  socket.on(`inputmensaje`, (data) => {
    arraymsj.push(data);
    socketserver.emit(`mensajeuser`, arraymsj);
  });
});
