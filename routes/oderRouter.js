import express from 'express';
import { createOrder, getOrders, getquote, updateOrder } from '../controllers/ordercontroller.js';


const ordertRouter =express.Router();

ordertRouter.post("/",createOrder)
ordertRouter.get("/",getOrders)
ordertRouter.post("/quote",getquote)
ordertRouter.put("/:orderId",updateOrder)



export default ordertRouter;