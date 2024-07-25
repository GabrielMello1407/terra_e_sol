import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  if (Number(req.params.id) === 9999)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Registro não encontrado",
      },
    });

  return res.status(StatusCodes.OK).json({
    id: req.params.id,
    nome: "Gabriel",
    numero: 1150,
    telefone: "35251249",
    valor: 150,
    data: "20/07/2024",
    detalhes: "Detalhes do pedido",
  });
};
