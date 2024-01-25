const OrderModel = require("../models/Orders");
const ProductsModel = require("../models/Products");
const order = async (req, res) => {
  try {
    const {
      user,
      products,
      totalPrice,
      name,
      address,
      city,
      state,
      postal_code,
      contact_phone,
    } = req.body;
    const newOrder = new OrderModel({
      user,
      products,
      totalPrice,
      name,
      address,
      city,
      state,
      postal_code,
      contact_phone,
    });
    const savedOrder = await newOrder.save();
    for (let product of products) {
      const productDetails = await ProductsModel.findById(product.product);
      if (productDetails) {
        productDetails.stock -= product.qty;
        const newProduct = await productDetails.save();
      }
    }
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.Message });
  }
};

module.exports = { order };