const { Router } = require('express')
const { generateProducts } = require('../test/routertest.js')
const { configObject } = require('../config/config.js')


const router = Router()

router.get('/', (req, res) =>{

    let products = []

    for (let i = 0; i < 100; i++) {
        products.push(generateProducts())
    }

    res.json({
        status: 'success',
        payload: products
    })
})

router.get('/logger', (req, res) => {
    req.logger.debug('Debug message')
    req.logger.http('HTTP message')
    req.logger.info('Info message')
    req.logger.warn('Warning message')
    req.logger.error('Error message')
    req.logger.fatal('Fatal message')
    res.send('Logging test completed')
})

module.exports = router