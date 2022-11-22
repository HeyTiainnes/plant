import { NextFunction, Request, Response } from "express";
import UserService from "../services/UserService";
import bcrypt from "bcrypt";
import User from "../models/interfaces/UserInterface";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import jwt_decode from "jwt-decode";

class UserController {
  public userService = new UserService();

  // CREATION D'UN NOUVEL UTILISATEUR
  async createUser(req: Request, res: Response): Promise<void> {
    bcrypt.hash(req.body.hash, 12).then(async (crypt) => {
      const newUser: User = {
        id: req.body.id,
        email: req.body.email,
        hash: crypt,
      };
      try {
        const createOneUser = await this.userService.createUser(newUser);

        res.send({
          status: "OK",
          data: newUser,
          message: "Votre compte à été créé !! ",
        });
      } catch (error: any) {
        res.status(error?.status || 400).send({
          status: "FAILED",
          data: { error: error?.message || error },
          message:
            "erreur lors de la création de votre compte. Veuillez rensigner un email unique ainsi qu'un mot de passe.",
        });
      }
    });
  }

  // CONNEXION
  async connectUser(req: Request, res: Response): Promise<void> {
    const userConnect: User = {
      id: req.body.id,
      email: req.body.email,
      hash: req.body.hash,
    };
    try {
      const connectOneUser = await this.userService.connectUser(userConnect);
      // console.log(userConnect.hash);
      // console.log(connectOneUser);
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
          { expiresIn: "4h" }
        );

        let decoded = jwt_decode(token);
        console.log(decoded);

        res.send({
          token,
          decoded,
          data: connectOneUser,
          message: `Vous voila connecté !! `,
        });
      } else {
        res.send({ message: "le couple MDP/email est incorrect" });
      }
    } catch (error: any) {
      res.status(error?.status || 400).send({
        status: "FAILED",
        data: { error: error?.message || error },
        message: "erreur de connexion",
      });
    }
  }
}

export default UserController;
