import knex from "knex";
import config from "./Enviroment"; // Ajuste o caminho conforme necessário

const getEnviroment = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return config.production; // Acessa a configuração de produção
    case "test":
      return config.test; // Acessa a configuração de test
    default:
      return config.development; // Acessa a configuração de desenvolvimento
  }
};

export const Knex = knex(getEnviroment());
