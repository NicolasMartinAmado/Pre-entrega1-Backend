const { ProductDao, UserDao, CartDao, MessageDao } = require('../daos/factory')
const ProductRepository = require('./product.repository')
const UserRepository = require('./user.repository')
const CartRepository = require('./cart.repository')
const MessageRepository = require('./message.repository')



const productService = new ProductRepository( ProductDao)
const userService = new UserRepository( UserDao)
const cartService = new CartRepository( CartDao)
const messageService = new MessageRepository( MessageDao)

module.exports = {
    productService,
    userService,
    cartService,
    messageService,
} 