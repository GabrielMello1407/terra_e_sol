import * as create from "./Create";
import * as count from "./Count";
import * as getAll from "./GetAll";
import * as getById from "./GetById";
import * as updateById from "./UpdateById";
import * as deleteById from "./DeleteById";

export const PedidosProvider = {
  ...create,
  ...getAll,
  ...getById,
  ...deleteById,
  ...updateById,
  ...count,
};
