import express from 'express';
import { createProduct, deleteProduct, getProduct, getProductById, updateProduct } from '../controllers/productcontroller.js';

const productRouter =express.Router();

productRouter.post("/",createProduct)
productRouter.get("/",getProduct)
productRouter.put("/:ProductId",updateProduct)
productRouter.get("/:ProductId",getProductById)
productRouter.delete("/:ProductId",deleteProduct)


export default productRouter;