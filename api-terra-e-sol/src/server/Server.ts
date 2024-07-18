// código base do servidor express
import express, { Request, Response } from "express";
import "dotenv/config";

import { router } from "./routes";

const server = express();

server.use(express.json());

server.use(router);

export { server };
