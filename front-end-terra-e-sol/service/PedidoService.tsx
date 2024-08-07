import { Pedido } from '@/app/types/PedidoTypes';
import axios, { AxiosResponse } from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3333',
});

export class PedidoService {
  // Listar todos os pedidos
  listarTodos(): Promise<AxiosResponse<Pedido[]>> {
    return axiosInstance.get<Pedido[]>('/pedidos');
  }

  // Criar um novo pedido
  criarPedido(dadosPedido: Omit<Pedido, 'id'>): Promise<AxiosResponse<Pedido>> {
    return axiosInstance.post<Pedido>('/pedidos', dadosPedido);
  }

  // Obter um pedido pelo ID
  obterPorId(id: number): Promise<AxiosResponse<Pedido>> {
    return axiosInstance.get<Pedido>(`/pedidos/${id}`);
  }

  // Atualizar um pedido pelo ID
  atualizarPorId(
    id: number,
    dadosAtualizados: Partial<Omit<Pedido, 'id'>>,
  ): Promise<AxiosResponse<Pedido>> {
    return axiosInstance.put<Pedido>(`/pedidos/${id}`, dadosAtualizados);
  }

  // Deletar um pedido pelo ID
  deletarPorId(id: number): Promise<AxiosResponse<void>> {
    return axiosInstance.delete<void>(`/pedidos/${id}`);
  }
}
