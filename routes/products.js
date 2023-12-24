const express = require("express");
const router = express.Router();
const {
    getFilteredProducts,
    getSortedProducts,
} = require("../controllers/products");

router.get("/getFilteredProducts", getFilteredProducts);
router.get("/getSortedProducts", getSortedProducts);

module.exports = router;
