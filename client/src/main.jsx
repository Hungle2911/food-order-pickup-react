import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { OrderProvider } from './context/OrderContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OrderProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </OrderProvider>
  </React.StrictMode>,
)
