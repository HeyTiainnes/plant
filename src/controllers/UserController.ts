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
        autorisation: req.body.autorisation,
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
      autorisation: req.body.autorisation,
    };
    try {
      const connectOneUser = await this.userService.connectUser(userConnect);
      const findRole = await this.userService.findRole(userConnect);
      // console.log(userConnect.hash);
      // console.log(connectOneUser);
      console.log("findrole ", findRole[0].autorisation);
      const retourCompare = await bcrypt.compare(
        userConnect.hash,
        connectOneUser[0].hash
      );
      console.log(retourCompare);
      if (retourCompare && process.env.SECRET_KEY) {
        // creation token
        const token = jwt.sign(
          { email: req.body.email, role: findRole[0].autorisation },
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
        message: "le couple MDP/email est incorrect",
      });
    }
  }

  // ALL users
  async allUser(req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await this.userService.allUser();
      res.status(200).send({ message: "all users", data: allUsers });
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
