const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price } = req.body;
    if(!name || !description || !price) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const product = await Product.create({
        name,
        description,
        price
    });
    res.status(201).json({
        message: "Product created",
        product
    });
});

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    const product = await Product.findByIdAndUpdate({ _id: id }, { name, description, price }, { new: true });
    if(product) {
        res.status(200);
        res.json({
            message: "Product updated",
            product
        });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete({ _id: id });
    if(product) {
        res.status(200);
        res.json({
            message: "Product deleted",
        });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };