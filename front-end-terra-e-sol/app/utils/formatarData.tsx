export const formatarData = (data: Date | string): string => {
  if (data instanceof Date) {
    return data.toLocaleDateString('pt-BR');
  }

  if (typeof data === 'string') {
    return new Date(data).toLocaleDateString('pt-BR');
  }

  return '';
};
