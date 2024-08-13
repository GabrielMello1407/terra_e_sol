import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { Ipedidos } from "../../database/models";
import { PedidosProvider } from "../../database/providers/pedidos";

interface IBodyProps extends Omit<Ipedidos, "id"> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      numero: yup.number().required(),
      telefone: yup.string().required(),
      valor: yup.number().required(),
      data: yup.date().required(),
      detalhes: yup.string().optional(),
      pronto: yup.boolean().default(false).optional(),
    })
  ),
}));

export const create = async (req: Request<{}, {}, Ipedidos>, res: Response) => {
  try {
    const body = req.body;

    // Garantir que pronto é false se não for fornecido
    const pedidoData = {
      ...body,
      pronto: body.pronto !== undefined ? body.pronto : false,
    };
    const result = await PedidosProvider.create(req.body);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.CREATED).json({ id: result });
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: "Erro interno no servidor.",
      },
    });
  }
};
