import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { parse, isDate } from "date-fns";

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

// Lib que realiza validação dos campos
const bodyValidation: yup.Schema<Ipedidos> = yup.object().shape({
  nome: yup.string().required().min(3),
  numero: yup.number().required(),
  telefone: yup.string().required(),
  valor: yup.number().required(),
  data: yup.date().transform(parseDateString).required(),
  detalhes: yup.string(),
});

export const create = async (req: Request<{}, {}, Ipedidos>, res: Response) => {
  let validateData: Ipedidos | undefined = undefined;
  try {
    validateData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (error) {
    const yupError = error as yup.ValidationError;
    const ValidationErrors: Record<string, string> = {};

    // mostra qual o erro que está dando, mapeando todos os erros e mostrando na tela
    yupError.inner.forEach((error) => {
      if (!error.path) return;
      ValidationErrors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: ValidationErrors,
      },
    });
  }
  console.log(validateData);

  return res.send("Create!");
};
