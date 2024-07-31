import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { Ipedidos } from "../../models";

export const getById = async (id: number): Promise<Ipedidos | Error> => {
  try {
    const result = await Knex(ETableNames.pedidos)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o registro");
  }
};
