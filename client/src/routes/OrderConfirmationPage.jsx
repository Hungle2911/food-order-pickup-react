import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import { URL } from "../components/MenuList"
import { useOrderContext } from '../context/OrderContext'
import { useState, useEffect } from "react"
const OrderConfirmationPage = () => {
  const [orderItems, setOrderItems] = useState([])
  const { orderId, setOrderId } = useOrderContext();
  const getOrder = async () => {
    try {
      const res = fetch(`${URL}/api/order:${orderId}`)
      const result = await res.json()
      console.log(result);
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getOrder()
  }, [])
  return(
    <>
    <NavBar />
    <div className="order-message">
  <p>
    Thank you so much for ordering. We will send you a notification as soon as
    your order is ready!
  </p>
  &lt;% const order=mergeQuantity(orderDetails) %&gt; &lt;% if (order.length&gt;
  0) {"{"} %&gt;
  <ul>
    &lt;% order.forEach(item=&gt; {"{"} %&gt;
    <li>
      <p>&lt;%= item.name %&gt; X &lt;%= item.quantity %&gt;</p>
    </li>
    &lt;% {"}"}) %&gt;
  </ul>
  <div>
    <div>Order ID: &lt;%= order[0].order_code %&gt;</div>
    <div>Order for: &lt;%= order[0].client_name %&gt;</div>
    <div>Time of the order: &lt;%= order[0].date_time %&gt;</div>
    <div>Total: $&lt;%= order[0].total_cost %&gt;</div>
    <div>Order note: &lt;%= order[0].instructions %&gt;</div>
    <div>Telephone: &lt;%= order[0].phone_number %&gt;</div>
    &lt;% {"}"} else {"{"} %&gt;
    <p>No order details found</p>
    &lt;% {"}"} %&gt;
  </div>
</div>

    <Footer />
    </>
  )
}
export default OrderConfirmationPage
