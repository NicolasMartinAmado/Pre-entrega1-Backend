const { configObject } = require("../config/config")

let UserDao
let ProductDao
let CartDao
let MessageDao
let ProductFile
let CartFile

switch (configObject.persistence) {
    case 'MONGO':
        const UserDaoMongo = require('./mongo/userDaoMongo')
        UserDao = UserDaoMongo

        const ProductDaoMongo = require('./mongo/productDaoMongo')
        ProductDao = ProductDaoMongo

        const CartDaoMongo = require('./mongo/cartDaoMongo')
        CartDao = CartDaoMongo

        const MessageDaoMongo = require('./mongo/messageDaoMongo')
        MessageDao = MessageDaoMongo
        break;

    case 'FILE':
        const ProductFileManager = require('./file/productManagerfile')
        ProductFile = ProductFileManager

        const CartFileManager = require('./file/cartManagerfile')
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