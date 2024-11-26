import express from 'express';
import { getProduct,createProduct } from '../controllers/productController.js';


const productRouter = express.Router();

productRouter.get("/",
    getProduct
)
productRouter.post("/",
    createProduct
)
// productRouter.post("/:name",getProductByName)




export default productRouter