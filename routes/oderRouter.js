import express from 'express';
import { createOrder } from '../controllers/ordercontroller.js';


const ordertRouter =express.Router();

ordertRouter.post("/",createOrder)
//ordertRouter.get("/",getOrd)


export default ordertRouter;