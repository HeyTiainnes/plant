import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User from "../src/models/interfaces/UserInterface";

const autToken = (req: Request, res: Response, next: NextFunction) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split("")[1];
  

  if (!token) {
    return res.send({ status: 401, message: "pas de token" });
  }

  jwt.verify(
    token,
    process.env.SECRET_KEY || "testSecretKey",
    (err: any, user: any) => {
      if (err) {
        return res.sendStatus(401);
      }

      //   req.user = user;
      next();
    }
  );
};

export default autToken;
