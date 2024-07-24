import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateByID";
import * as deleteById from "./deleteById";

export const PedidosController = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
};
