import { Ipedidos } from "../../models";
import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const create = async (
  pedido: Omit<Ipedidos, "id">
): Promise<number | Error> => {
  try {
    const [insertedId] = await Knex(ETableNames.pedidos).insert(pedido);

    if (insertedId === undefined) {
      return new Error("Erro ao cadastrar o registro");
    }

    // Se precisar do ID do último registro inserido:
    const [result] = await Knex(ETableNames.pedidos)
      .select("id")
      .where("id", insertedId);

    return result.id;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao cadastrar o registro");
  }
};
