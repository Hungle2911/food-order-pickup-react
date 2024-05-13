import { createContext, useState } from 'react'
const CartContext = createContext()

function CartProvider({children}) {
  const [cartItems, setCartItems] = useState([])
  return (
    <div>CartProvider</div>
  )
}

export default CartProvider
