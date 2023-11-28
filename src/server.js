const handlebars = require( `express-handlebars`)

const productsRouter = require(`./routes/products.router.js`);
const apicarts = require(`./routes/carts.routes.js`)
const express = require(`express`);
const app = express();
const port = 4000;



app.engine(`hbs`, handlebars.engine())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

app.use(`/api/products`, productsRouter);
//app.use(`/api/carts`, apicarts);//

app.get('/api/products', productsRouter);
app.get('/api/products/:id', productsRouter)
app.post('/api/products', productsRouter);
app.delete('/api/products/:id', productsRouter);
app.get(`/single`, (req, res) => {
  res.send('archivo subido');
});
app.get('/usuario', (req, res) => {
  res.json({ nombre: 'Julian', edad: 85, apellido: 'Alvarez', correo: 'Julianalv@gmail.com' });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
