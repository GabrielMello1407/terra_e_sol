import { ETableNames } from "../../ETableNames";
import { Ipedidos } from "../../models";
import { Knex } from "../../knex";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<Ipedidos[] | Error> => {
  try {
    const validId = Number.isInteger(id) && id > 0 ? id : 0;

    const result = await Knex(ETableNames.pedidos)
      .select("*")
      .where((builder) => {
        if (validId > 0) {
          builder.where("id", validId);
        }
        if (filter) {
          builder
            .orWhere("nome", "like", `%${filter}%`)
            .orWhere("numero", "like", `%${filter}%`);
        }
      })
      .offset((page - 1) * limit)
      .limit(limit);
    console.log(
      `Page: ${page}, Limit: ${limit}, Filter: '${filter}', ID: ${validId}`
    );
    // Caso a busca inicial não encontre o ID válido
    if (validId > 0 && result.every((item) => item.id !== validId)) {
      const resultById = await Knex(ETableNames.pedidos)
        .select("*")
        .where("id", validId)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar os registros");
  }
};
