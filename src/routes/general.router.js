const Router = require ("express");
const ProductCRouter = require ("./products.router.js");
const MessagesCRouter = require ("./messages.router.js");
const CartCRouter = require ("./api/cart.route.js");
const UserCRouter = require ("./api/users.route.js");
const sessionsRoute = require ("./api/sessions.route.js");
const mailRoute = require ("./api/mail.route.js");
const { routerPruebas } = require ("./api/pruebas.route.js");
const dirname = require ('../utils/dirname.js')
const swaggerJsDoc = require ("swagger-jsdoc");
const swaggerUiExpress = require ("swagger-ui-express");
const router = Router()

const swaggerOptions = {
  definition: {
      openapi: '3.0.1',
      info: {
          title: 'Documentación de app BackEndJs',
          description: 'Api Docs para BackEndJs'
      }
  },
  apis: [`${dirname}/docs/**/*.yaml`]
}

const specs = swaggerJsDoc(swaggerOptions)
router.use('/apidocs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

// definiendo las API
router.use('/api/products', (new ProductCRouter()).getRouter())
router.use('/api/carts', (new CartCRouter()).getRouter())
router.use('/api/sessions', sessionsRoute);
router.use('/api/messages', (new MessagesCRouter()).getRouter())
router.use('/api/mail', mailRoute)
router.use('/api/users', (new UserCRouter()).getRouter());
router.use('/api/pruebas', routerPruebas) //mocking


router.use('*', (req, res) => res.status(404).send('Not Found'))
router.use((err, req, res) => {
  req.logger.error(err)
  res.status(500).json({message: "Error Server", err})})

module.exports =  router;

