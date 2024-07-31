import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
import { Ipedidos } from "../../models";

export const updateById = async (
  id: number,
  pedidos: Omit<Ipedidos, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pedidos)
      .update(pedidos)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro.");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro.");
  }
};
