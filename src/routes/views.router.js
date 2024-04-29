const {Router} = require(`express`)
const viewsController = require('../controllers/views.controllers')
const router = Router()

const { isAdminOrPremium, isUser } = require('../middlewars/roleVerification')
const { isAuthenticated } = require('../middlewars/auth.middleware')


const {
    home,
    realTimeProducts,
    chat,
    products,
    productsDetails,
    login,
    register,
    shoppingCart,
    resetPasswordView,
    sendResetEmail,
    resetPassword
} = new viewsController()

router.get('/', home)

router.get('/realtimeProducts', isAdminOrPremium, realTimeProducts)

router.get('/chat',isUser , chat)

router.get('/products', products)

router.get('/products/details/:pid', productsDetails)

router.get('/login', login)

router.get('/register', register)

router.get('/cart', isAuthenticated, shoppingCart)

router.get('/reset-password', resetPasswordView)

router.post('/reset-password', sendResetEmail)

router.get('/reset-password:token', resetPasswordView)

router.post('/reset-password:token', resetPassword)




module.exports= router