async function Test() {
  const ProductManager = require('./ProductManager');
  const managerProduct = new ProductManager(`./producto.json`);

  //Agregando productos mediante addProduct
  await managerProduct.addProduct('BMW', 'Duster 12', 450000, '../', 1, 54);
  await managerProduct.addProduct('Lamborghini', 'Aventador', 9000000, '../', 5, 32);

  //Eliminando productos segun su id
  try {
    const productoeliminado = await managerProduct.deleteProduct();
    console.log({ productoeliminado });
    console.log(await managerProduct.getProducts());
  } catch (error) {
    console.log('error' + error);
  }

  //Actualizando productos mediante updateProduct
try {
    const updateProduct = await managerProduct.updateProduct(1,'BMW', 'Lordtype 12', 500000, '../', 1, 21);
console.log(updateProduct)
await managerProduct.getProductByid(2)
} catch(error){
    console.log("error" + error)
}


  
}

Test();
