import express from 'express';
import { createUser, getUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/",createUser)
userRouter.post("/login",loginUser)
userRouter.get("/details",getUser)

export default userRouter