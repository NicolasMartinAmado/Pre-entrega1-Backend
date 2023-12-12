const {Router} = require(`express`)
const router = Router()
const ProductManager = require('../ProductManager');
const managerProduct = new ProductManager(`./producto.json`);




router.get(`/`, (req, res) => {
    res.render(
        `index`,
        {
            title: "Mercado E-commerce",
            name: "mercado amado",
            style : `../index.css`,
            scriptView:'./js/index.js' 
            
        }
    )
})
router.get(`/home`, async (req, res) => {
    const productos = await managerProduct.getProducts()
    res.render(
        `home`,
        {
            title: "Mercado",
            productos,
            name: "PRODUCTOS",
            style : `./home.css`,
            scriptView:'./js/home.js' 
        }
    )
})

router.get(`/realtimeproducts`, async (req, res) => {
const productos = await managerProduct.getProducts()

res.render(
    `realtimeproducts`,{
        title: "Products",
        productos,
            name: "PRODUCTOS",
            style : `../index.css`,
            scriptView:'./js/realtimeproducts.js' 
    }
)
})
module.exports= router