export interface Pedido {
  id: number;
  nome: string;
  data: Date;
  numero: number;
  telefone: string;
  valor: number;
  detalhes?: string;
}
