const express = require(`express`);
const app = express();
const port = 4000;

const ProductManager = require('./src/ProductManager');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const managerProduct = new ProductManager(`./producto.json`);

app.get('/', (req, res) => {
  res.send(`<h1> Bienvenidos a la pagina mas grande del mundo, registrate para ver nuestros productos </h1>`);
});

app.get('/products', async (req, res) => {
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


app.put('/products/:id', async (req, res) => {
  const id = req.params.id ;
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


app.post('/', (req, res) => {
  res.send(`<h1> Bienvenidos a la pagina mas grande del mundo, registrate para ver nuestros productos </h1>`);
});

app.delete('/', (req, res) => {
  res.send(`<h1> Bienvenidos a la pagina mas grande del mundo, registrate para ver nuestros productos </h1>`);
});

app.get('/usuario', (req, res) => {
  res.json({ nombre: 'Julian', edad: 85, apellido: 'Alvarez', correo: 'Julianalv@gmail.com' });
});

app.listen(4000, () => {
  console.log(`Server is running on port http://localhost:4000`);
});
