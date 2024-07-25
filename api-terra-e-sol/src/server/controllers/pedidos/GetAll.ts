import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface IQueryProps {
  page?: number | null;
  limit?: number | null;
  filter?: string | null;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(
    yup.object().shape({
      page: yup.number().notRequired().moreThan(0),
      limit: yup.number().notRequired().moreThan(0),
      filter: yup.string().notRequired(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IQueryProps>,
  res: Response
) => {
  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", 1);

  return res.status(StatusCodes.OK).json([
    {
      id: 1,
      nome: "Gabriel",
      numero: 1150,
      telefone: "35251249",
      valor: 150,
      data: "20/07/2024",
      detalhes: "Detalhes do pedido",
    },
  ]);
};
