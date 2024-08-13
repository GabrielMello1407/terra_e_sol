export interface Ipedidos {
  id: number;
  nome: string;
  numero: number;
  telefone: string;
  valor: number;
  data: Date | null;
  detalhes?: string;
  pronto?: boolean;
}
