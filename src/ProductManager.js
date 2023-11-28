const { json } = require('express');
const fs = require(`fs`);

class ProductManager {
  constructor(path) {
    this.producto = [];
    this.path = path;
  }

  validateProduct = ({ title, description, price, thumbnail, stock }) => {
    if (!title || !description || !price || !thumbnail || !stock) {
      return console.error('Campos incompletos');
    }
  };

  async addProduct(title, description, price, thumbnail, code, stock, category, status) {
    
    this.producto.push({
      id: this.producto.length + 1,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code = Math.random() * 99,
      stock: stock,
      category: category,
      status: status,
    });
    const productosString = JSON.stringify(this.producto, null, 2);
    await fs.promises.writeFile(this.path, productosString);
    return productosString;
  }

  getProductbyCode(code) {
    const product = this.producto.find((product) => product.code === code);
    if (product) return console.log('ERROR, no se puede repetir el mismo codigo');
  }

  async getProducts() {
    let contenido = await fs.promises.readFile(this.path, 'utf-8', null, 2);
    contenido = JSON.parse(contenido);
    console.log('PRODUCTOS ENCONTRADOS : ', contenido);
    return contenido;
  }

  async writeProductsToFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.producto, null, 2), { encoding: 'utf-8' });
    } catch (error) {
      console.error('Error writing products file:');
    }
  }

  async getProductByid(id) {
    let getprod = await this.getProducts();
    const findById = getprod.find((item) => item.id == id);

    if (!findById) {
      console.log('error, id no encontrado');
    } else return findById;
  }

  async updateProduct(id, title, description, price, thumbnail, code, stock,category,status) {
    const productId = this.producto.findIndex((product) => product.id === id);
    if (productId === -1) {
      console.log('Producto no encontrado');
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error('Missing properties');
    }
    this.producto[productId] = { id, title, description, price, thumbnail, code, stock,category,status };
    const productsJSON = JSON.stringify(this.producto, null, 2);
    await fs.promises.writeFile(this.path, productsJSON);
    return this.producto[productId];
  }

  async deleteProduct(id) {
    const productosArchivadosString = await fs.promises.readFile(this.path, 'utf-8');
    const productosArchivadosArray = JSON.parse(productosArchivadosString);
    const productoEncontrado = productosArchivadosArray.find((x) => (x.id == id));
    if(!productoEncontrado) {
      console.log(`No se encontró ningún producto con el id: ${id}!`)
      return;
    }
    const nuevosProductos = productosArchivadosArray.filter(x => x.id != id);
    this.productos = nuevosProductos;
    const nuevosProductosString = JSON.stringify(nuevosProductos, null, 2)
    await fs.promises.writeFile(this.path, nuevosProductosString);
  }
}
module.exports = ProductManager;
