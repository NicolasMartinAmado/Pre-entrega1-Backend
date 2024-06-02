const { Router } = require('express')
const ViewsController = require('../controllers/views.controller.js')
const { isAdminOrPremium, isUser, isAdmin } = require('../middlewars/roleverification.js')
const { isAuthenticated } = require('../middlewars/auth.middleware.js')
const { generateProducts } = require('../test/routertest.js')
const { sendEmail } = require('../utils/sendEmail.js')


const router = Router()

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
    resetPassword,
    resetPasswordViewToken,
    adminView
} = new ViewsController()

router.get('/', login)

router.get('/realtimeproducts', realTimeProducts)

router.get('/chat',isUser , chat)

router.get('/productsview', products)

router.get('/products/details/:pid', productsDetails)

router.get('/login', login)

router.get('/register', register)

router.get('/shoppingCart',shoppingCart)

router.get('/reset-password', resetPasswordView)

router.post('/reset-password', sendResetEmail)

router.get('/reset-passwordToken', resetPasswordViewToken, resetPassword)

router.post('/reset-passwordToken', resetPasswordViewToken, resetPassword)


router.post('/reset-password', resetPassword)

router.get('/admin', isAdmin, adminView)

/* router.get('/logout', async (req,res) =>{
    res.render('login')
}) */

module.exports = router