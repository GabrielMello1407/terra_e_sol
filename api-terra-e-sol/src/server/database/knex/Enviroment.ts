import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
  client: "mysql2",
  useNullAsDefault: true,
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "pedidos",
  },
  migrations: {
    directory: path.resolve(__dirname, "..", "migrations"),
  },
  seeds: {
    directory: path.resolve(__dirname, "..", "seeds"),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      done();
    },
  },
};

export const test: Knex.Config = {
  ...development,
  connection: {
    database: "pedidos_test",
  },
};

export const production: Knex.Config = {
  ...development,
};
