const express = require('express');
const router = express.Router();
const database = require('../db/queries/database');

/*
Cart Routes:
GET /cart: Retrieve all items currently in the customer's cart.
POST /cart/add: Add an item to the cart.
POST /cart/remove: Remove an item from the cart.
POST /cart/clear: Clear all items from the cart.
*/



// GET /cart: Retrieve all items currently in the customer's cart.
router.get('/', async (req, res) => {
  try {
    const data = await database.getCartItems()
    console.log(data);
    res.status(200).json({
      status: 'success',
      data
    })
  } catch (error) {
    console.error(error)
  }
  //   .then(cartItems => {
  //     totalPrice = sum(cartItems)
  //     res.render('cart', { cartItems, totalPrice, mergeQuantity })
  //     console.log(totalPrice);
  //   })
});

// POST /cart/add: Add an item to the cart.

router.post('/', async (req, res) => {
  try {
    const { menu_item_id, quantity } = req.body;
    console.log(req.body);
    const data = await database.addItemToCart(menu_item_id, quantity)
  } catch (error) {
    console.error(error)
  }
})
// PATCH /cart/increment: Add quantity to the cart.

router.put('/increment', async (req, res) => {
  try {
    const { id, menu_item_id } = req.body;
    const data = await database.increaseQuantity(id, menu_item_id); // Ensure this function exists and updates the quantity
    res.status(200).json('Quantity increased');
  } catch (error) {
    console.error('Error increasing quantity:', error);
    res.status(500).json({ error: 'Failed to increase quantity' });
  }
});



// PATCH /cart/decrement: Decrease quantity to the cart.

router.put('/decrement', async (req, res) => {
  try {
    const { id, menu_item_id } = req.body;
    const data = await database.decreaseQuantity(id, menu_item_id); // Ensure this function exists and updates the quantity
    res.status(200).json('Quantity decreased');
  } catch (error) {
    console.error('Error decreasing quantity:', error);
    res.status(500).json({ error: 'Failed to decrease quantity' });
  }
});
// DELETE api/cart: Remove an item from the cart.
router.delete('/', async (req, res) => {
  try {
    const { id, menu_item_id } = req.body;
    const deleteData = await database.deleteCartItems(id, menu_item_id)
    res.json('Item was deleted')
  } catch (error) {
    console.error(error)
  }

    // .then((result) => {
    //   return database.getCartItems();
    // })
    // .then(cartItems => {
    //   console.log(cartItems);
    //   const totalPrice = sum(cartItems);
    //   // Send the updated total price along with a success status
    //   res.status(200).json({ totalPrice })
    // })
    // .catch((err) => {
    //   console.error('Error deleting item:', err);
    //   res.status(500).send('Error deleting item'); // Send error response
    // });
});


module.exports = router
