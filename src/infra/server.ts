import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import express, {  Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import { routes } from "@infra/routes";

const server = express();

server.use(helmet());
server.use(cors({
  origin: "*", 
}));

server.use(routes)

server.use(
  (error: Error, request: Request, response: Response, next: NextFunction)=>{
    return response.status(400).json({
      status: "Error",
      message: error.message
    })
  }
)


export {server}