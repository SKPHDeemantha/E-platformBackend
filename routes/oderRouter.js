import express from 'express';
import { createOrder, getOrders } from '../controllers/ordercontroller.js';


const ordertRouter =express.Router();

ordertRouter.post("/",createOrder)
ordertRouter.get("/",getOrders)


export default ordertRouter;