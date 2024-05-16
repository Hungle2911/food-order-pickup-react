const express = require('express');
const router = express.Router();
const menu_items = require('./menu_items-api')
const cart = require('./cart-api')
const order = require('./order-api')
router.use("/menu", menu_items);
router.use("/cart", cart)
router.use("order", order)
module.exports = router;
