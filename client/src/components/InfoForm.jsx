import React, {useState, useEffect} from 'react'
import { URL } from './MenuList'
function InfoForm() {
  const [name, setName] = useState('')
  const [instruction, setInstruction] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const sendCartOrder = async (e) => {
    e.preventDefault()
    try {
      const phone_number = phoneNumber
      const body = {name, instruction, phone_number}
      console.log(body);
      const response = await fetch(`${URL}/api/order`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
      })
      const result = await response.json()
      // window.location = `/order:${result}`
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form id="orderForm" className="order-form" onSubmit={sendCartOrder}>
  <label htmlFor="customerName">Name</label>
  <input type="text" id="customerName" placeholder="Your name" required="" onChange={e => setName(e.target.value)}/>
  <label htmlFor="instruction">Special instructions</label>
  <input
    type="text"
    id="instruction"
    placeholder="Please let us know if you have any allergies "
    onChange={e => setInstruction(e.target.value)}
  />
  <label htmlFor="customerPhone">Phone Number</label>
  <input
    type="tel"
    id="customerPhone"
    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
    placeholder="xxx-xxx-xxxx"
    required=""
    onChange={e => setPhoneNumber(e.target.value)}
  />
  <button id="placeOrderButton" type="submit" className="submit-button">
    Place Order
  </button>
</form>

  )
}

export default InfoForm
