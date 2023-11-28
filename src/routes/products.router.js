const express = require(`express`)
const productsRouter = express.Router()
const ProductManager = require('../ProductManager');
const managerProduct = new ProductManager(`./producto.json`);

async function inicializarProductos() {
  const productos = await managerProduct.getProducts()
  managerProduct.producto = productos;
}

inicializarProductos()

productsRouter.use(express.json());
productsRouter.use(express.urlencoded({ extended: true }));

productsRouter.get(`/api/products`,async (req, res) => {
    const producto = await managerProduct.getProducts();
    
    let {limit} = req.query
     if ( limit > producto.length) {
      res.status(200).json({
        status: 'ok',
        data: producto,
      });
    } else {
      res.status(200).json({
        status: 'ok',
        data: producto.slice(0, limit),
      });
    }
  });

  productsRouter.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    const products = await managerProduct.getProductByid(id);
  
    if (typeof products === 'string') {
      res.status(404).json({
        status: 'fail',
        data: products,
      });
    } else {
      res.status(200).json({
        status: 'ok',
        data: products,
      });
    }
  });

 productsRouter.post(`/api/products`, async (req, res) => {
  let newProduct = req.body;
  res.status(200).send("Producto agregado con exito!" + newProduct)
  await managerProduct.addProduct('Audi', 'TT', 78500000, '../', 6, "vehicles",true);
 })

productsRouter.delete(`/api/products/:id`, async  (req, res) => {
  const id = req.params.id;
  const prodeliminado = await managerProduct.deleteProduct(id);

 
  res.status(200).json({
    status: 'ok',
    data: {prodeliminado},
  });
})
  
productsRouter.put('/api/products/:id', async (req,res) => {
  const productId = req.params.id;
  let updateData = req.body;

  updateData = await managerProduct.updateProduct(12, "LAMBORGINI", "SPIDER", 9999999, "../", 0.5,1, "Vehicles", true)



  try {
    await managerProduct.updateProduct(productId, "LAMBORGINI");
  } catch(error) {
    res.status(404).send('No se pudo actualizar el producto!')
  }
})       
  

  

  /**
productsRouter.put()
productsRouter.delete() */




module.exports = productsRouter