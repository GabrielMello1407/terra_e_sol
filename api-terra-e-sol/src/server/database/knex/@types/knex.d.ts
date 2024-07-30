import { Ipedidos } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    pedido: Ipedidos;
  }
}
