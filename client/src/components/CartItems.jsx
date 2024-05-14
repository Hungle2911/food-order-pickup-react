import { useState, useEffect } from 'react'
import { URL } from './MenuList'
function CartItems() {
  const [cartItems, setCartItems] = useState([])
  const getCartItems = async () => {
    try {
      const response = await fetch(`${URL}/api/cart`)
      const result = await response.json()
      setCartItems(result.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getCartItems()
  }, [])
  // console.log(cartItems);
  return (
    <>
  <div className="cart-title">
    <h1>Cart</h1>
  </div>
  <ul id="foodCart" className="cart">
    {cartItems.map(item => (
      <li className="cart-item" key={item.cart_id}>
      <span className="cart-item-image">
        <img className="item-img" src= {item.photo_url} />
      </span>
      <span className="cart-description">
        <p className="cart-item-name"> {item.name}</p>
      </span>
      <span className="cart-item-cost">
         {item.cost} X
        <span id="quantity"> {item.quantity}</span>
        </span>
        <button
        className="deleteCart"
      >
        Remove
      </button>
    </li>
    ))}


        {/* <button
          className="decrease-btn"
          data-id="<%= item.item_id %>"
          data-cartid="<%= item.cart_id %>"
        >
          -
        </button>
        <button
          className="increase-btn"
          data-id="<%= item.item_id %>"
          data-cartid="<%= item.cart_id %>"
        >
          +
        </button> */}

  </ul>
  {/* <div id="totalPrice" className="cart-total">
    <p className="total-amount">Total Price: $&lt;%= totalPrice %&gt;</p>
  </div> */}
</>

  )
}

export default CartItems
