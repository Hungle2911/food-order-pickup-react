import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { OrderProvider } from './context/OrderContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
    <OrderProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </OrderProvider>
    </CartProvider>
  </React.StrictMode>,
)
