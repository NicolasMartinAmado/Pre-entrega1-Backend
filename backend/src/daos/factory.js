const { configObject } = require("../config/config.js")

let UserDao
let ProductDao
let CartDao
let MessageDao
let ProductFile
let CartFile

switch (configObject.persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./mongo/userDaoMongo.js')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require('./mongo/productDaoMongo.js')
        ProductDao = ProductDaoMongo

        const CartDaoMongo = require('./mongo/cartdaomongo.js')
        CartDao = CartDaoMongo

        const MessageDaoMongo = require('./mongo/messageDaomongo.js')
        MessageDao = MessageDaoMongo
        break;

    case 'FILE':
        const ProductFileManager = require('./file/productManagerFile.js')
        ProductFile = ProductFileManager

        const CartFileManager = require('./file/cartManagerFile.js')
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