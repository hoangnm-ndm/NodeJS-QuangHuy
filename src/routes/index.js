import { Router } from "express";
import productRoutes from "../modules/product/product.route.js";

const routes = Router();

routes.use("/products", productRoutes);
// routes.use("/products", productRoutes);
// routes.use("/products", productRoutes);

export default routes;
