const fs = require(`fs`)


class CartManager {
constructor(path){
    this.path = path
    this.cartArray = []
}



async createCart(){

    const carritoString = await fs.promises.readFile(this.path, 'utf-8');
    const carritoarray = JSON.parse(carritoString);

    const id = carritoarray.length + 1
    const newCart = {
      id: id,
      producto: []
    }
    carritoarray.push(newCart)
    const carrito = JSON.stringify(carritoarray, null, 2);
    await fs.promises.writeFile('carrito.json', carrito);
}

async addtoCart(cartid, productid){
    const carritoString = await fs.promises.readFile(this.path, 'utf-8');
    const carritoarray = JSON.parse(carritoString);
   
    const cartfound = carritoarray.findIndex((x) => (x.id == cartid));

    if (cartfound !== -1) {
      const carritosCopia = [...carritoarray];
      const cartfound = { ...carritoarray[cartfound] };
      const productIndex = carritoEncontrado.producto.findIndex((p) => parseInt(p.pid) === parseInt(productid));
  
      if (productIndex !== -1) {
        carritoEncontrado.producto[productIndex].quantity += 1;
      } else {
        carritoEncontrado.producto.push({ pid: parseInt(id), quantity: 1 });
      }
      carritosCopia[carritoEncontradoIndex] = carritoEncontrado;
  
      const nuevaListaString = JSON.stringify(carritosCopia, null, 2);
      await fs.promises.writeFile(this.path, nuevaListaString);
    }
    else {
      console.log(`No se encontró ningún carrito con el id: ${cartid}`)
    }
    }

    async getCartById(id) {
        const carritoString = await fs.promises.readFile(this.path, 'utf-8');
        const carritoarray = JSON.parse(carritoString);
        const carritoEncontrado = carritoarray.find((x) => (x.id == id));
        return carritoEncontrado.producto;
      }

}


module.exports = CartManager

    
