import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

//CLEANER WAY IS WE IMPORT ALL THE ROUTES FROM A CONTROLLER FILE WHERE ALL THE ROUTES ARE DEFINED

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
