import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User from "../src/models/interfaces/UserInterface";

dotenv.config({ path: ".env.local" });

export const autToken = (req: Request, res: Response, next: any) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];

  if (!token) {
    return res.send({ status: 401, message: "pas de token" });
  }

  if (process.env.SECRET_KEY) {
    jwt.verify(token, process.env.SECRET_KEY, (err: any, user: any) => {
      if (err) {
        console.log("----error verify ", err);
        console.log("----error verify .name", err.name);
        return res.send({ status: 401, message: "not verify", data: err });
      }
      console.log("verifié");
      console.log(user);
      next();
    });
  }
};

export const isAdmin = (req: Request, res: Response, next: any) => {
  const autHeader = req.headers["authorization"];
  const token = autHeader && autHeader.split(" ")[1];

  if (!token) {
    return res.send({ status: 401, message: "pas de token" });
  }

  if (process.env.SECRET_KEY) {
    jwt.verify(token, process.env.SECRET_KEY, (err: any, decoded: any) => {
      if (err) {
        return res.send({ status: 401, message: "not verify" });
      }
      if (decoded.role === "admin") {
        console.log("payload dans le test isAdmin", decoded);
        next();
      } else {
        res.send({ message: "only admin" });
      }
    });
  }
};
