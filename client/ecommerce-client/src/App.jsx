import Products, { ProductsPage } from './pages/Products';
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductDetail from './components/products/ProductDetail';


function App() {
  

  return (
    <Router>
      <h1>Ecommerce</h1>
      <Routes>
        <Route path='/' element={<Products/>} />
        <Route path='/detalle/:pid' element={<ProductDetail/>} />

      </Routes>
    </Router>
  )
}

export default App
