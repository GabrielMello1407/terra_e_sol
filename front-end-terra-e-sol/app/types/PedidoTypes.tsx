export interface Pedido {
  id: number;
  nome: string;
  data: string;
  numero: number;
  telefone: string;
  valor: number;
  detalhes?: string;
  pronto?: boolean;
}
