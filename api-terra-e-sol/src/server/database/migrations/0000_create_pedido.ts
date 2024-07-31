import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.pedidos, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome", 150).checkLength("<=", 150).index().notNullable();
      table.bigInteger("numero").index().notNullable();
      table.string("telefone").index().notNullable();
      table.float("valor").index().notNullable();
      table.date("data").index().notNullable(); // Ensure this is correctly defined
      table.string("detalhes").index().nullable();

      table.comment("Essa é a tabela de pedidos");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.pedidos}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.pedidos).then(() => {
    console.log(`# Dropped table ${ETableNames.pedidos}`);
  });
}
