import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import CartItems from "../components/CartItems"
import InfoForm from "../components/InfoForm"
const CartPage = () => {
  return(
    <>
    <NavBar />
    <div className="cart-box">
      <CartItems />
      <InfoForm />
    </div>
    <Footer />
    </>
  )
}
export default CartPage
