import express from "express";
import getCurrentUser, {
  createUser,
  getUser,
  googleLogin,
  loginUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/details", getUser);
userRouter.post("/google", googleLogin);
userRouter.get("/", getCurrentUser);

export default userRouter;
