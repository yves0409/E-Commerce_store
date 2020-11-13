import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

//Route : GET /api/products
//What it does: fetching ALL products
//Who : Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

//Route : GET /api/products/:id
//What it does: fetching a single products
//Who : Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

export { getProducts, getProductById };
