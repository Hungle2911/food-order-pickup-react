import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import CartItems from "../components/CartItems"
const CartPage = () => {
  return(
    <>
    <NavBar />
    <div className="cart_box">
      <CartItems />
    </div>
    <Footer />
    </>
  )
}
export default CartPage
