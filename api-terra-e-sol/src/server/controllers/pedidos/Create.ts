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
// Definição da interface IFilter para query params
interface IFilter {
  filter?: string;
}

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
  query: getSchema<IFilter>(
    yup.object().shape({
      filter: yup.string().optional().min(3),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Ipedidos>, res: Response) => {
  console.log(req.body);

  return res.send("Create!");
};
