const {Router} = require('express')
const router = Router()
const productRouter = require('./products.router.js')
const cartRouter = require('./carts.router.js')
const viewsRouter = require('./views.router.js')
const sessionRouter = require('./session.router.js')
const { handleError } = require('../middlewars/error/handleError.js')



router.use('/api/products', productRouter)
router.use('/api/carts', cartRouter)
router.use('/', viewsRouter)
router.use('/api/sessions', sessionRouter)



router.use(handleError)
/* router.use(( err, req, res, next ) => {
    console.error(err)
    res.status(500).send(`Error server ${err}`)
}) */

module.exports = router