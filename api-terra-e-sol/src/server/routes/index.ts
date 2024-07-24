import { Router } from "express";

import { PedidosController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Teste");
});
router.get(
  "/pedidos",
  PedidosController.getAllValidation,
  PedidosController.getAll
);
router.post(
  "/pedidos",
  PedidosController.createValidation,
  PedidosController.create
);
router.get(
  "/pedidos/:id",
  PedidosController.getByIdValidation,
  PedidosController.getById
);
router.put(
  "/pedidos/:id",
  PedidosController.updateByIdValidation,
  PedidosController.updateById
);
router.delete(
  "/pedidos/:id",
  PedidosController.deleteByIdValidation,
  PedidosController.deleteById
);

export { router };
