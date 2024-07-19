import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { PedidosController } from "./../controllers";

const router = Router();

router.get("/", (req, res) => {
  return res.send("Teste");
});

router.post("/pedidos", PedidosController.create);

export { router };
