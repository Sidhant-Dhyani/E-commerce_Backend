const ProductsModel = require("../models/Products");

const getFilteredProducts = async (req, res) => {
    try {
        const filter = {};
        if (req.query.minPrice) {
            filter.price = filter.price || {};
            filter.price.$gte = req.query.minPrice;
        }
        if (req.query.maxPrice) {
            filter.price = filter.price || {};
            filter.price.$lte = req.query.maxPrice;
        }
        if (req.query.brand) {
            filter.brand = req.query.brand;
        }
        if (req.query.category) {
            filter.category = req.query.category;
        }

        if (req.query.sort === "asc") {
            var sort = { price: 1 };
        } else if (req.query.sort === "desc") {
            var sort = { price: -1 };
        } else {
            var sort = undefined;
        }

        const filteredProducts = await ProductsModel.find(filter).sort(sort);
        res.json(filteredProducts);
    } catch (error) {
        console.log("Error filtering products", error);
        res.status(500).json(error.message);
    }
};

const getSortedProducts = async (req, res) => {
    console.log("Hello World!!");
};

module.exports = { getFilteredProducts, getSortedProducts };
