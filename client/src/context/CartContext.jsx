import React, { createContext, useContext, useState, useEffect } from 'react'
import { URL } from '../components/MenuList'
const CartContext = createContext()
const useCartContext = () => useContext(CartContext)
function CartProvider({children}) {
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const deleteCartItems = async (id, menu_item_id) => {
    try {
      const body = {id, menu_item_id}
      const response = await fetch(`${URL}/cart`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      setCartItems(cartItems.filter(item => {return item.item_id !== menu_item_id }))
    } catch (error) {
      console.error(error)
    }
  }
  const getCartItems = async () => {
    try {
      const response = await fetch(`${URL}/cart`)
      const result = await response.json()
      setCartItems(result.data)
    } catch (error) {
      console.error(error)
    }
  }

  const increaseCartItem = async (id, menu_item_id) => {
    try {
      const body = {id, menu_item_id}
      const response = await fetch(`${URL}/cart/increment`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      console.log(response.json());
      if (response.ok) {
        setCartItems(cartItems.map(item =>
          item.item_id === menu_item_id ? { ...item, quantity: item.quantity + 1 } : item
        ));
      }
      console.log(cartItems);
    } catch (error) {
      console.error(error)
    }
  }
  const decreaseCartItem = async (id, menu_item_id) => {
    try {
      const body = {id, menu_item_id}
      const response = await fetch(`${URL}/cart/decrement`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      if (response.ok) {
        setCartItems(cartItems.map(item =>
          item.item_id === menu_item_id ? { ...item, quantity: item.quantity - 1 } : item
        ));
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => acc + (item.cost * item.quantity), 0);
    setTotalPrice(newTotal);
  }, [cartItems]);
  // console.log(cartItems);
  return (
    <CartContext.Provider value={{cartItems, totalPrice, deleteCartItems, getCartItems, increaseCartItem, decreaseCartItem }}>
      {children}
    </CartContext.Provider>
  )
}

export {CartProvider, useCartContext}
