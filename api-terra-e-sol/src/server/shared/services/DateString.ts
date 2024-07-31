import { parse, isValid } from "date-fns";

export const parseDateString = (value: any, originalValue: any) => {
  const parsedDate = parse(originalValue, "dd/MM/yyyy", new Date());

  if (isValid(parsedDate)) {
    return parsedDate;
  }

  throw new Error("Data inválida: " + originalValue);
};
