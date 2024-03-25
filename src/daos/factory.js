const { configObject } = require("../config/config")

let UserDao
let ProductDao
let CartDao
let MessageDao
let ProductFile
let CartFile


switch (configObject.persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./mongo/usersDaoMongo')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require('./mongo/productDaoMongo')
        ProductDao = ProductDaoMongo

        const CartDaoMongo = require('./mongo/cartDaoMongo')
        CartDao = CartDaoMongo

        const MessageDaoMongo = require('./mongo/messageDaomongo')
        MessageDao = MessageDaoMongo
        break;

    case 'FILE':
        const ProductFileManager = require('../daos/file/productManagerFile')
        ProductFile = ProductFileManager

        const CartFileManager = require('../daos/file/cartManagerFile')
        CartFile = CartFileManager
        break;

    default:
        break;
}



module.exports = {
    UserDao,
    ProductDao,
    CartDao,
    MessageDao,
    ProductFile,
    CartFile,
}