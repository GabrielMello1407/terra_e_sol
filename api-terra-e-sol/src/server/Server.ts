// código base do servidor express
import express, { Request, Response } from "express";

const server = express();

server.get("/", (req: Request, res: Response) => {
  return res.send("Teste");
});

export { server };
