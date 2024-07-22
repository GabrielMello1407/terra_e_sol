import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { parse, isDate } from "date-fns";
import { validation } from "../../shared/middlewares";

interface Ipedidos {
  nome: string;
  numero: number;
  telefone: string;
  valor: number;
  data: Date;
  detalhes?: string;
}
const parseDateString = (value: any, originalValue: any) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "dd/MM/yyyy", new Date());

  return parsedDate;
};

export const createValidation = validation((getSchema) => ({
  body: getSchema<Ipedidos>(
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

export const create = async (req: Request<{}, {}, Ipedidos>, res: Response) => {
  console.log(req.body);

  return res.status(StatusCodes.BAD_REQUEST).send("Created!");
};
