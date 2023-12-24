
const Product = require('../models/Products');

const GetAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const GetOne = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const CreateNew = async (req, res) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        discountPercentage: req.body.discountPercentage,
        rating: req.body.rating,
        stock: req.body.stock,
        brand: req.body.brand,
        category: req.body.category,
        thumbnail: req.body.thumbnail,
        images: req.body.images
    });

    try {
        const newProduct = await product.save();
        console.log('Saved new Product', newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const EditProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        existingProduct.title = req.body.title;
        existingProduct.description = req.body.description;
        existingProduct.price = req.body.price;
        existingProduct.discountPercentage = req.body.discountPercentage;
        existingProduct.rating = req.body.rating;
        existingProduct.stock = req.body.stock;
        existingProduct.brand = req.body.brand;
        existingProduct.category = req.body.category;
        existingProduct.thumbnail = req.body.thumbnail;
        existingProduct.images = req.body.images;
        existingProduct.isHidden = req.body.isHidden;

        const updatedProduct = await existingProduct.save();
        res.json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error.message);
    }
}

const DeleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const existingProduct = await Product.findById(productId);

        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await existingProduct.deleteOne();

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { GetAll, GetOne, CreateNew, EditProduct, DeleteProduct };
