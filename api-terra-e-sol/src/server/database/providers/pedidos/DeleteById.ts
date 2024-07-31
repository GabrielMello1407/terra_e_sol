import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.pedidos).where("id", "=", id).del();

    if (result > 0) result;

    return new Error("Erro ao apagar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao apagar o registro");
  }
};
