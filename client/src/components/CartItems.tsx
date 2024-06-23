import { useCartContext } from "../context/CartContext";
import { useEffect } from "react";
function CartItems() {
  const {
    cartItems,
    totalPrice,
    deleteCartItems,
    getCartItems,
    increaseCartItem,
    decreaseCartItem,
  } = useCartContext();

  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <>
      <div className="cart-title">
        <h1>Cart</h1>
      </div>
      <ul id="foodCart" className="cart">
        {cartItems.map((item) => (
          <li className="cart-item" key={item.cart_id}>
            <span className="cart-item-image">
              <img className="item-img" src={item.photo_url} />
            </span>
            <span className="cart-description">
              <p className="cart-item-name"> {item.name}</p>
            </span>
            <span className="cart-item-cost">
              {item.cost} X<span id="quantity"> {item.quantity}</span>
              {item.quantity > 1 && (
                <button
                  className="decrease-btn"
                  onClick={() => {
                    decreaseCartItem(item.cart_id, item.item_id);
                  }}
                >
                  {" "}
                  -{" "}
                </button>
              )}
              <button
                className="increase-btn"
                onClick={() => {
                  increaseCartItem(item.cart_id, item.item_id);
                }}
              >
                {" "}
                +{" "}
              </button>
            </span>
            <button
              className="deleteCart"
              onClick={() => {
                deleteCartItems(item.cart_id, item.item_id);
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div id="totalPrice" className="cart-total">
        <p className="total-amount">Total Price: ${totalPrice} </p>
      </div>
    </>
  );
}

export default CartItems;
