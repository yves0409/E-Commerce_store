//USING ES MODULES HERE, SO INSTEAD OF REQUIRE WE USE IMPORT
//MAKE SURE TO USE "type": "module" IN THE ROOT PACKAGE.JSON
//BEFORE THIS WOULD BE : const express = require("express")
//SO INSTEAD OF 'module.exports' WE CAN JUST USE EXPORT DEFAULT
//NOTE THAT IF WE IMPORT A FILE WE NEED TO USE THE .js EXTENSION
import express from "express";
import colors from "colors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();
const app = express();

//middleware that allows us to accept json data in the body
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

//routes we get from from the controllers
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

//ROUTE TO PAYPAL CLIENT_ID
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//error handling middleware imported for middleware
app.use(notFound);
app.use(errorHandler);

//env variable for the PORT where the server is running
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .underline
  )
);
