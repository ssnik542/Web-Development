import express from "express";
import { auth } from "../middlewares/auth";
import { registerController, loginController, userController, logoutController } from "../controller";


export const userRouter = express.Router();

userRouter.post('/register', registerController.register)
userRouter.post('/login', loginController.login)
userRouter.post('/logout', auth, logoutController.logout)
userRouter.get('/me', auth, userController.me)
