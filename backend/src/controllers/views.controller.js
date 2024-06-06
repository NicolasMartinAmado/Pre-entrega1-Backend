
const { productService, userService, cartService } = require('../repositories/service.js')
const { logger } = require('../utils/logger.js')
const { sendPasswordResetEmail, verifyResetToken } = require('../utils/ressetpassword.js')
const { createHash, isValidPassword } = require('../utils/hashPassword.js')
const { sendEmail } = require('../utils/sendEmail.js')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { configObject } = require('../config/config.js')
const Swal = require('sweetalert2')

class ViewsController {
    constructor(){
        this.productViewService = productService
        this.userViewService = userService
        this.cartViewService = cartService
    }

    home = async (req, res) => {
        try{
            const { limit, pageNumber, sort, query } = req.query
            const parsedLimit = limit ? parseInt(limit, 10) : 10
            const userId = req.session && req.session.user ? req.session.user.user : null
            const user = await this.userViewService.getUserBy({ _id: userId })
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } = await this.productViewService.getProducts({ limit: parsedLimit, pageNumber, sort, query })
            //console.log(docs)
            res.render('home', {
                title: 'Home',
                user,
                docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page
            })
        }catch(err){
            logger.error(err)
            res.status(500).send({message:'Server error'})
        }
    }

    realTimeProducts = async (req, res) => {
        try{
            const { limit, pageNumber, sort, query } = req.query
            const parsedLimit = limit ? parseInt(limit, 10) : 10
            const userId = req.session && req.session.user ? req.session.user.user : null
            const user = await this.userViewService.getUserBy({ _id: userId })
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } = await this.productViewService.getProducts({ limit: parsedLimit, pageNumber, sort, query })
            //console.log(docs)
            res.render('realtimeproducts', {
                title: 'Real Time',
                user,
                docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page
            })
        }catch(err){
            logger.error(err)
            res.status(500).send({message:'Server error'})
        }
    }

    chat = async (req,res) => {
        const userId = req.session && req.session.user ? req.session.user.user : null
        const user = await this.userViewService.getUserBy({ _id: userId })
        try{
            res.render('chat', {
            title: "Chat",
            user,
            })
        }catch(err){
            logger.error(err)
            res.status(500).send({message:'Server error'})
        }
    }

    products = async (req,res) =>{
        try{
            const { limit, pageNumber, sort, query } = req.query
            const parsedLimit = limit ? parseInt(limit, 10) : 10
            const userId = req.session && req.session.user ? req.session.user.user : null
            logger.info(userId)
            const user = await this.userViewService.getUserBy({ _id: userId })
            console.log('User data:', user)
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, page } = await this.productViewService.getProducts({ limit: parsedLimit, pageNumber, sort, query })
          
console.log(docs)

            res.render('productsview', {
                title: 'Products View',
                user,
                docs,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                page
            })
        }catch(err){
            logger.error(err)
            res.status(500).send({message:'Server error' + err})
            console.log(err)
        }
    }

    productsDetails = async (req,res) =>{
        try{
            //agregar para manderle el usuario
            const pid = req.params.pid
            //console.log(pid)
            const filteredProduct = await this.productViewService.getProductById(pid)
            //console.log(filteredProduct)
            if(filteredProduct){
                res.render('details', {
                    title: 'Product Detail',
                    filteredProduct
                })
            }
            else{
                res.status(404).send("Product not exist")
            }
        }catch(error){
            logger.error(error)
            res.status(500).send('Server error')
        }
    }

    login = async (req,res) =>{
        res.render('login')

    }

    register = async (req,res) =>{
        res.render('register')
    }

    shoppingCart = async(req, res) => {
        try {
            //agregar para mandarle el usuario, para que el boton siempre este bien seteado
            const userId = req.session && req.session.user ? req.session.user.user : null
            if (!userId) {
                return res.status(400).send('User not logged in')
            }

            const user = await this.userViewService.getUserBy({ _id: userId })
            console.log("usuario en cart: ", user)
            const cartId = user.cart
            console.log("carrtido del user: ", cartId)
            if (!cartId) {
                return res.status(400).send('User does not have a cart')
            }

            const cart = await this.cartViewService.getCartById(cartId)
            console.log('Cart:', cart)

            const productDetailsPromises = cart.map(async item => {
                const productId = item.product.toString()
                const productDetailArray = await this.productViewService.getProductById(productId)
                const productDetail = productDetailArray[0]
                return { productDetail, quantity: item.quantity }
            })
            
            // Esperar a que todas las promesas se resuelvan
            const productsWithQuantities = await Promise.all(productDetailsPromises)
            
            //console.log('Products with quantities:', productsWithQuantities)
            /* res.render('shoppingCart', { 
                title: 'Shopping Cart',
                cartId,
                productsWithQuantities
            }) */
            res.render('shoppingCart', {
                title: 'Shopping Cart',
                cartId,
                productsWithQuantities
                
               
            })
        }
        catch(err){
            logger.error(err)
            res.status(500).send('Server error')
        }
    }

    resetPasswordView = async(req, res) => {
        
        res.render('reset-password')
    }

    sendResetEmail = async (req, res) => {
        const userId = req.session && req.session.user ? req.session.user.user : null
        const user = await this.userViewService.getUserBy({ _id: userId })
        try {
           
            const transport = nodemailer.createTransport({
               
                secure: true,
                service: 'gmail',
                port: 465,
                auth: {
                    user: configObject.gmail_user_app,
                    pass: "boja yrjt wpee psbz"
                }
            })
                const token = jwt.sign({ userId }, configObject.jwt_secret_key, { expiresIn: '1h' })
            
              
                const resetUrl = `https://backend-mern-s3ql.onrender.com/reset-passwordToken?token=${token}`
            
                // Crear y enviar el correo electrónico
               await transport.sendMail({
                    
                    from: 'nikiamado123@gmail.com',
                    to: user.email,
                    subject: 'Restablecer contraseña',
                    html: `
                        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
                        <a href="${resetUrl}">Restablecer contraseña</a>
                    `
                })

              
                   
                
            
        
          
        } catch (error) {
            //console.error('Error sending email:', error)
            res.status(500).json({ error: 'Error sending email' })
            console.log(error)
        }
       
    }

    resetPassword = async (req, res) => {
        const { token } = req.query
        const { newPassword, confirmPassword } = req.body
        const userId = req.session && req.session.user ? req.session.user.user : null
        const user = await this.userViewService.getUserBy({ _id: userId })
        logger.info(user._id)
        logger.info(user.email)
        if (!token) {
            return res.status(400).json({ error: 'Token es requered' })
        }
    
        if (newPassword !== confirmPassword) {
            return Swal.fire({
                title: `ERROR, LAS CONTRASEÑAS DEBEN SER IGUALES` 
            })
        }

        try {
            const decodedToken = verifyResetToken(token)
            if (!decodedToken) {
                return res.status(400).json({ error: 'Token is no valid or expired' })
            }

            if (!user) {
                return res.status(400).json({ error: 'User not found' })
            }
    
            if (isValidPassword(newPassword, { password: user.password })) {
                return res.status(400).json({ error: 'You can not use same password' })
            }
         
            await this.userViewService.updateUserPassword(userId, createHash(newPassword))
    
            
        } catch (error) {
            res.status(500).json({ error: error+ 'Error updating password' + user + newPassword })
        }

    }

    resetPasswordViewToken = async(req, res) => {
        const { token } = req.query

        if (!token) {
            return res.status(400).json({ error: 'Token is required' })
        }
        
        res.render('reset-passwordToken', { token })
    }

    adminView = async (req, res) => {
        try {
            const users = await this.userViewService.getUsers()
            //console.log(users)
            res.render('adminView', { 
                title: 'Users',
                users 
            })
        } catch (error) {
            console.error('Error fetching users:', error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }

}

module.exports = ViewsController
