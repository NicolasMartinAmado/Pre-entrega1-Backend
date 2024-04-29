import { Router } from "express";

import ProductCRouter from "./products.router.js";
import MessagesCRouter from "./messages.router.js";
import CartCRouter from "./carts.router.js";
import UserCRouter from "./users.router.js";
import sessionsRoute from "./session.router.js";
import mailRoute from "./mail.router.js";
import dirname from '../utils/dirname.js'
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

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



router.use('*', (req, res) => res.status(404).send('Not Found'))
router.use((err, req, res) => {
  req.logger.error(err)
  res.status(500).json({message: "Error Server", err})})

export default router;