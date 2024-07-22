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

export { router };
