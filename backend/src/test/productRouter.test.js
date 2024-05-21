

import { use, request } from 'chai';
import chaiHttp from 'chai-http';
import { expect } from 'chai';
use(chaiHttp);


import app from '../server.js';
import productDaoMongo from '../daos/mongo/productDaoMongo.js';

import ProductsController from '../controllers/products.controllers.js';


describe('Product Router Tests', () => {

    it('Should get all products', (done) => {
        request(app)
            .get('/api/products')
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.status).to.equal('success')
                expect(res.body.payload).to.be.an('array')
                done()
            })
    })

    it('Should add a new product', (done) => {
        request(app)
            .post('/api/products')
            .send({
                title: 'New Product',
                description: 'Description of the new product',
                price: 10,
                thumbnail: 'thumbnail-url',
                code: 'poi123',
                stock: 100,
                status: 'active',
                category: 'new-category'
            })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.status).to.equal('success')
                expect(res.body.message).to.equal('Product added successfully')
                done()
            })
    })

    it('Should get a product by ID', (done) => {

        const existingProductId = 'existingProductId'

        request(app)
            .get(`/api/products/${existingProductId}`)
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body.status).to.equal('success')
                expect(res.body.payload).to.be.an('object')
                done()
            })
    })
})


describe('Product Controller Tests', () => {
    it('Should add a new product', async () => {
        const newProductData = {
            title: 'New Product',
            description: 'Description of the new product',
            price: 10,
            thumbnail: 'thumbnail-url',
            code: 'poi123',
            stock: 100,
            status: 'active',
            category: 'new-category'
        }

        const ProductsControll = new ProductsController()

        await ProductsControll.addProduct(newProductData)

        const addedProduct = await productDaoMongo.getById(newProductData.code)
        expect(addedProduct).to.not.be.null
        expect(addedProduct.title).to.equal(newProductData.title)

    })
})
