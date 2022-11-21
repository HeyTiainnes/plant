import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User from "../src/models/interfaces/UserInterface";

dotenv.config({ path: ".env.local" });

const autToken = (req: Request, res: Response, next: any) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];

  if (!token) {
    return res.send({ status: 401, message: "pas de token" });
  }

  if (process.env.SECRET_KEY) {
    jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) => {
      if (err) {
        return res.send({ status: 401, message: "not verify " });
      }
      console.log("verifié");
      console.log(user);
      next();
    });
  }
};

export default autToken;
