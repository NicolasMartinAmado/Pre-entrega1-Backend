const express = require(`express`);
const productsRouter = express.Router();
const ProductManager = require('../../ProductManager');
const { productModel } = require('../../models/products.model');
const managerProduct = new ProductManager(`./producto.json`);

async function inicializarProductos() {
  const productos = await managerProduct.getProducts();
  managerProduct.producto = productos;
}

inicializarProductos();

productsRouter.use(express.json());
productsRouter.use(express.urlencoded({ extended: true }));

productsRouter.get(`/`, async (req, res) => {
  const producto = await managerProduct.getProducts();

  let { limit } = req.query;
  if (limit > producto.length) {
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

productsRouter.get('/:id', async (req, res) => {
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

productsRouter.post(`/`, async (req, res) => {
  try {
    const { title,description,thumbnail,code,stock,category,status} = req.body
    // validación
    const result = await productModel.create({
      title,description,thumbnail,code,stock,category, status
    })
    console.log(title,description,thumbnail,code,stock,category,status)
    res.status(201).send({ 
        status: 'success',
        payload: result        
    })
} catch (error) {
    console.log(error)
}
});

productsRouter.delete(`/:id`, async (req, res) => {
  const id = req.params.id;
  const prodeliminado = await managerProduct.deleteProduct(id);

  res.status(200).json({
    status: 'ok',
    data: { prodeliminado },
  });
});

productsRouter.put('/:id', async (req, res) => {
  const productId = req.params.id;
  let updateData = req.body;

  updateData = await managerProduct.updateProduct(productId, updateData.title, updateData.description, updateData.price, updateData.thumbnail, updateData.stock, updateData.category);

  try {
    await managerProduct.updateProduct(productId, 'LAMBORGINI');
  } catch (error) {
    res.status(404).send('No se pudo actualizar el producto!');
  }
});

/**
productsRouter.put()
productsRouter.delete() */

module.exports = productsRouter;
