import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProductPages from './pages/PageProducto'

import './App.css'

function App() {

  return (
    <>
      <h1>Ecommerce</h1>
      <ProductPages />
    </>
  )
}

export default App