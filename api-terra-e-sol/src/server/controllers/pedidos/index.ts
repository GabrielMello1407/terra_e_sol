import * as create from "./Create";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";

export const PedidosController = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
};
