import { Router } from "express";
import { StatusCodes } from "http-status-codes";

const router = Router();

router.get("/", (_, res) => {
  return res.send("Teste");
});

router.post("/teste2", (req, res) => {
  console.log(req.body);
  return res.status(StatusCodes.ACCEPTED).json(req.body);
});

export { router };
