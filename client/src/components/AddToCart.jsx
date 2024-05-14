import React from 'react'
import { URL } from './MenuList'
function AddToCart({item}) {

  const sendItemsToCart = async (item) => {
    try {
      const menu_item_id = item.id
      const quantity = 1
      const body = {menu_item_id, quantity}
      // console.log(body);
      const response = await fetch(`${URL}/api/cart`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      // console.log(response);
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <button
        className="addToCartBtn"
        role="button"
        onClick={() => {sendItemsToCart(item)}}
      >
        Add to Cart
      </button>
  )
}

export default AddToCart
