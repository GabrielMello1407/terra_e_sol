import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { parseDateString } from "../../shared/services/DateString";
import { validation } from "../../shared/middlewares";
import { Ipedidos } from "../../database/models";

interface IBodyProps extends Omit<Ipedidos, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      numero: yup.number().required(),
      telefone: yup.string().required(),
      valor: yup.number().required(),
      data: yup.date().transform(parseDateString).required(),
      detalhes: yup.string().optional(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  return res.status(StatusCodes.CREATED).send("Created!");
};
