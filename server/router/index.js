const express = require('express');
const router = express.Router();
const menu_items = require('./menu_items-api')
const cart = require('./cart-api')
router.use("/menu", menu_items);
router.use("/cart", cart)

module.exports = router;
