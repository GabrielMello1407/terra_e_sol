// src/server/Server.ts

import express from "express";
import "dotenv/config";
import cors from "cors"; // Importando o pacote cors

import "./shared/services/TraducoesYup";
import { router } from "./routes";

require("./database");

const server = express();

// Configuração do CORS
server.use(
  cors({
    origin: "http://localhost:3001", // Permite acesso do seu frontend rodando nesta origem
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

server.use(express.json());
server.use(router);

export { server };
