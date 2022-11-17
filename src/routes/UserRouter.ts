import { Router } from "express";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", (req, res) => userController.createUser(req, res));
userRouter.post("/login", (req, res) => userController.connectUser(req, res));

export default userRouter;
