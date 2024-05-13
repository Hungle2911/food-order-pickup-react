const express = require('express');
const router = express.Router();
const menu_items = require('./menu_items-api')
router.use("/menu", menu_items);


module.exports = router;
