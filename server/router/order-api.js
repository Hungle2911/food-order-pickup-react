const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');
const { sum, randomCodeGenerator, mergeQuantity } = require('./helper/helper-function')
// const { sendOrderConfirmation } = require('../send-message');

/*
Order Routes:
POST /order: Place a new order. This route should include the items in the cart, customer details, and any additional order information.
GET /order/:id: Retrieve details of a specific order by its ID.
*/

// POST /order: Place a new order. This route should include the items in the cart, customer details, and any additional order information.
router.post('/', async (req, res) => {
  try {
    const { instructions, client_name, phone_number } = req.body;
    let order_code = randomCodeGenerator()
    const carts = await database.getCartItems()
    const total_cost = await sum(carts);
    const data = await database.placeOrder(order_code, total_cost, instructions, client_name, phone_number)
    // console.log(data);
    res.status(200).json({
      status: 'success',
      data: data.order_id
    })
  } catch (error) {
    console.error(error)
  }

  // database
  //   .getCartItems()
  //   .then(carts => {
  //     const total_cost = sum(carts);
  //     return { total_cost }
  //   })
  //   .then((result) => {
  //     const { total_cost } = result
  //     return database.placeOrder(order_code, total_cost, instructions, client_name, phone_number)
  //   })
  //   .then(menuItems => {
  //     //to send the text message to the customer when they click on place order button
  //     // sendOrderConfirmation();

  //     res.json({ redirect: `/order/${menuItems.order_id}` });
  //   })
});

// GET /order/:id: Retrieve details of a specific order by its ID.
router.get('/:id', (req, res) => {
  let order_code = req.params.id
  database
    .getOrder(order_code)
    .then(orderDetails => {
      res.render('order', { orderDetails, mergeQuantity })
    })
    .then((result) => {
      return database.deleteCart()
    })
    .catch(err => console.error(err));
});



module.exports = router;
