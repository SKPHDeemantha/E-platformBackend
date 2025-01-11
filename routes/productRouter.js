import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/productController.js';

const productRouter =express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)
productRouter.put("/:productId",updateProduct)
productRouter.get("/:productId",getProductById)
productRouter.delete("/:productId",deleteProduct)


export default productRouter;