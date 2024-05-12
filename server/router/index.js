const express = require('express');
const router = express.Router();
const menu_items = require('./menu_items-api')
router.use("/menu_items", menu_items);


module.exports = router;
