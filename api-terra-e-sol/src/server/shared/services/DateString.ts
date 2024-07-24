import { parse, isDate } from "date-fns";

export const parseDateString = (value: any, originalValue: any) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "dd/MM/yyyy", new Date());

  return parsedDate;
};
