import { Router } from "express";
import productController from "./product.controller.js";

const productRoutes = Router();

// productRoutes.get("/", productController.getAllProduct);
// productRoutes.get("/:id", productController.getProductById);
productRoutes.post("/", productController.createProduct);

export default productRoutes;
