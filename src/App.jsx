import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './contexts/StoreContext'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'
import { AuthProvider } from './contexts/AuthContext'
import Products from './pages/Products/Products'
import ProductDetails from './pages/Product-details/ProductDetails'
import Checkout from './pages/Checkout/checkout'
import MyOrders from './pages/MyOrders/MyOrders'


const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <Routes>
            <Route path="/">
              <Route index element={<Home />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path= "registrar" element={<Register />}></Route>
              <Route path= "/productos" element={<Products />} ></Route>
              <Route path= "/producto/:slug" element={<ProductDetails />}></Route>
              <Route path='/checkout' element={<Checkout/>}></Route>
              <Route path='/myorders' element={<MyOrders/>}></Route>
            </Route>

            
          </Routes>
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App