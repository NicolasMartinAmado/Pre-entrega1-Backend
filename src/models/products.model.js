const {Schema, model} = require('mongoose')

const productsCollection = 'Products'

const ProductSchema = Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        unique: true
    },
    thumbnail: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
       
    }
    
})

const productModel = model(productsCollection, ProductSchema)

module.exports = {
    productModel
}