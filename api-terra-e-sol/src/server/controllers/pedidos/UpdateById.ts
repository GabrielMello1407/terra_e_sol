import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { parseDateString } from "../../shared/services/DateString";

interface IParamProps {
  id?: number;
}
interface IBodyProps {
  nome: string;
  numero: number;
  telefone: string;
  valor: number;
  data: Date;
  detalhes?: string;
}

export const updateByIdValidation = validation((getSchema) => ({
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
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  console.log(req.params);
  console.log(req.body);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Não implementado!");
};
