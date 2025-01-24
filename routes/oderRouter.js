import express from 'express';
import { createOrder, getOrders, getquote } from '../controllers/ordercontroller.js';


const ordertRouter =express.Router();

ordertRouter.post("/",createOrder)
ordertRouter.get("/",getOrders)
ordertRouter.post("/quote",getquote)


export default ordertRouter;