import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import UserProvider from './context/ContextUser'
import CartProvider from './context/CartContext'


import TopNavbar from './components/navbar/navbar'

import ProductPages from './pages/ProductPage'
import ProductDetailPages from './pages/productdetail'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ChatPage from './pages/chat'
import RealTimeProducts from './pages/Realtimeproducts'
import CartPage from './pages/Cart'
import ProtectedRoute from './route'
import SuccessPage from './pages/purchasePage'


function App() {

  return (

      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <TopNavbar />
            <Routes>
              <Route path='/' element={<ProductPages />} />
              <Route path='/products' element={<ProductPages />} />
              <Route path='/products/detail/:pid' element={<ProductDetailPages />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/realtimeproducts' element={<RealTimeProducts />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/success' element={<SuccessPage />}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </UserProvider>

  )
}

export default App