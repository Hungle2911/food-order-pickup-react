import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { URL } from "../components/MenuList";

const OrderConfirmationPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const { orderId } = useParams();

  const getOrder = async () => {
    try {
      const res = await fetch(`${URL}/api/order/${orderId}`);
      const result = await res.json();
      setOrderItems(result.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error(error);
      setLoading(false); // Ensure loading is set to false in case of an error
    }
  };

  useEffect(() => {
    getOrder();
  }, [orderId]); // Added orderId as a dependency

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (orderItems.length === 0) {
    return <div>No order details found.</div>; // Handle empty state
  }

  const order = orderItems[0]; // Assuming orderItems is an array with a single order object

  return (
    <>
      <NavBar />
      <div className="order-message">
        <p>
          Thank you so much for ordering. We will send you a notification as
          soon as your order is ready!
        </p>
        {orderItems.map((item, index) => (
          <ul key={index}>
            <li>
              <p>
                {" "}
                {item.name} X {item.quantity}
              </p>
            </li>
          </ul>
        ))}
        <div>
          <div>Order ID: {order.order_code}</div>
          <div>Order for: {order.client_name}</div>
          <div>Time of the order: {order.date_time}</div>
          <div>Total: ${order.total_cost}</div>
          <div>Order note: {order.instructions}</div>
          <div>Telephone: {order.phone_number}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmationPage;
