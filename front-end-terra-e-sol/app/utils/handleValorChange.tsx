export const handleValorChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setValor: React.Dispatch<React.SetStateAction<number>>,
) => {
  const rawValue = e.target.value
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.');

  setValor(parseFloat(rawValue));
};
