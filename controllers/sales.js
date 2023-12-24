const Orders = require('../models/Orders');
const ProductsModel = require("../models/Products");
const getAllSales = async (req, res) => {
    try {
        const orders = await Orders.find({});
        const mappedOrders = [];

        for (let order of orders) {
            const products = [];

            for (let product of order.products) {
                const productDetails = await ProductsModel.findById(product._id);
                products.push({
                    name: productDetails.title,
                    qty: product.qty
                });
            }

            mappedOrders.push({
                name: order.name,
                address: order.address,
                city: order.state,
                state: order.state,
                postal_code: order.postal_code,
                contact_phone: order.contact_phone,
                totalPrice: order.totalPrice,
                products: products
            });
        }

        res.status(200).json(mappedOrders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getYesterdaySales = async (req, res) => {
    try {
        const today = new Date();
        const yesterday = new Date(today);

        yesterday.setDate(yesterday.getDate() - 1);

        let startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
        let endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));

        const orders = await Orders.find({
            createdAt: {
                $gte: startOfYesterday,
                $lt: endOfYesterday
            }
        });

        const mappedOrders = [];

        for (let order of orders) {
            const products = [];

            for (let product of order.products) {
                const productDetails = await ProductsModel.findById(product._id);
                products.push({
                    name: productDetails.title,
                    qty: product.qty
                });
            }

            mappedOrders.push({
                name: order.name,
                address: order.address,
                city: order.state,
                state: order.state,
                postal_code: order.postal_code,
                contact_phone: order.contact_phone,
                totalPrice: order.totalPrice,
                products: products
            });
        }

        res.status(200).json(mappedOrders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getLastWeekSales = async (req, res) => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        let endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));
        const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);

        const orders = await Orders.find({
            createdAt: {
                $gte: lastWeek,
                $lt: endOfYesterday
            }
        });

        const mappedOrders = [];

        for (let order of orders) {
            const products = [];

            for (let product of order.products) {
                const productDetails = await ProductsModel.findById(product._id);
                products.push({
                    name: productDetails.title,
                    qty: product.qty
                });
            }

            mappedOrders.push({
                name: order.name,
                address: order.address,
                city: order.state,
                state: order.state,
                postal_code: order.postal_code,
                contact_phone: order.contact_phone,
                totalPrice: order.totalPrice,
                products: products
            });
        }

        res.status(200).json(mappedOrders);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getLastMonthSales = async (req, res) => {
    try {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        let endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        const orders = await Orders.find({
            createdAt: {
                $gte: lastMonth,
                $lt: endOfYesterday,
            }
        });
        const mappedOrders = [];

        for (let order of orders) {
            const products = [];

            for (let product of order.products) {
                const productDetails = await ProductsModel.findById(product._id);
                products.push({
                    name: productDetails.title,
                    qty: product.qty
                });
            }

            mappedOrders.push({
                name: order.name,
                address: order.address,
                city: order.state,
                state: order.state,
                postal_code: order.postal_code,
                contact_phone: order.contact_phone,
                totalPrice: order.totalPrice,
                products: products
            });
        }
        res.status(200).json(mappedOrders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllSales, getYesterdaySales, getLastMonthSales, getLastWeekSales };