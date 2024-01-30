const express = require("express");
const router = express.Router();
const {
    getFilteredProducts,
    getSortedProducts,
    getSearchedProducts
} = require("../controllers/products");

router.get("/getFilteredProducts", getFilteredProducts);
router.get("/getSortedProducts", getSortedProducts);
router.get("/searchProducts", getSearchedProducts);

module.exports = router;
