import { Router } from "express";
import { isAdmin } from "../../middleware/auth";
import UserController from "../controllers/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/register", (req, res) => userController.createUser(req, res));
userRouter.post("/login", (req, res) => userController.connectUser(req, res));
userRouter.get("/all", isAdmin, (req, res) => userController.allUser(req, res));

export default userRouter;
