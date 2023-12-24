const express = require("express");
const router = express.Router();
const { order } = require("../controllers/checkout");

router.post("/order", order);

module.exports = router;