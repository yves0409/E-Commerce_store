//USING ES MODULES HERE, SO INSTEAD OF REQUIRE WE USE IMPORT
//MAKE SURE TO USE "type": "module" IN THE ROOT PACKAGE.JSON
//BEFORE THIS WOULD BE : const express = require("express")
//SO INSTEAD OF 'module.exports' WE CAN JUST USE EXPORT DEFAULT
//NOTE THAT IF WE IMPORT A FILE WE NEED TO USE THE .js EXTENSION
import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";

const app = express();

dotenv.config();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
