import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import bcrypt from "bcrypt";
import User from "../models/interfaces/UserInterface";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

class UserController {
  public userService = new UserService();

  async createUser(req: Request, res: Response): Promise<void> {
    bcrypt.hash(req.body.hash, 12).then(async (crypt) => {
      const newUser: User = {
        id: req.body.id,
        email: req.body.email,
        hash: crypt,
      };
      try {
        const createOneUser = await this.userService.createUser(newUser);

        res.send({ status: "OK", data: newUser });
      } catch (error: any) {
        res
          .status(error?.status || 400)
          .send({ status: "FAILED", data: { error: error?.message || error } });
      }
    });
  }

  async connectUser(req: Request, res: Response): Promise<void> {
    const userConnect: User = {
      id: req.body.id,
      email: req.body.email,
      hash: req.body.hash,
    };
    try {
      const connectOneUser = await this.userService.connectUser(userConnect);
      console.log(userConnect.hash);
      console.log(connectOneUser);
      const retourCompare = await bcrypt.compare(
        userConnect.hash,
        connectOneUser[0].hash
      );
      console.log(retourCompare);
      if (retourCompare && process.env.SECRET_KEY) {
        // creation token
        const token = jwt.sign(
          { email: req.body.email },
          process.env.SECRET_KEY,
          { expiresIn: 6000 }
        );
        //test validité du token
        // if (token) {
        //   const tokentest = jwt.verify(token, process.env.SECRET_KEY);
        //   console.log(`test du token`, tokentest);
        // }

        res.send({ token, data: connectOneUser });
      } else {
        res.send({ message: "MDP incorrect" });
      }
    } catch (error: any) {
      res
        .status(error?.status || 400)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  }
  // authenticateToken(req: Request, res: Response, next: NextFunction) {
  //   console.log(req);
  //   const authHeader = req.headers["authorization"];
  //   const token = authHeader && authHeader.split(" ")[1];

  //   if (token == null) return res.sendStatus(401);

  //   jwt.verify(
  //     token,
  //     process.env.SECRET_KEY || "testSecretKey",
  //     (err, user) => {
  //       if (err) {
  //         return res.sendStatus(401);
  //       }

  //       req.user = user;
  //       next();
  //     }
  //   );
  // }

  // app.get('/api/me', authenticateToken, (req, res) => {
  //   res.send(req.user);
  // });
}

export default UserController;
