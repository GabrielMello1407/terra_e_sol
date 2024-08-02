// app/pages/pedidos/page.tsx

'use client';

import { PedidoService } from '@/service/PedidoService';
import { useEffect, useState } from 'react';

interface Pedido {
  id: number;
  nome: string;
  numero: number;
  telefone: string;
  valor: number;
  data: Date;
  detalhes?: string;
}

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const service = new PedidoService();
        const response = await service.listarTodos();

        // Certifique-se de que os dados recebidos sejam objetos Date
        const pedidosComDataCorreta = response.data.map((pedido: any) => ({
          ...pedido,
          data: new Date(pedido.data),
        }));

        setPedidos(pedidosComDataCorreta);
      } catch (err) {
        console.error('Erro ao buscar pedidos:', err);
        setError('Não foi possível buscar os pedidos.');
      } finally {
        setLoading(false);
      }
    };

    fetchPedidos();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista de Pedidos</h1>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            <p>
              <strong>Nome:</strong> {pedido.nome} <br />
            </p>
            <p>
              <strong>Número:</strong> {pedido.numero} <br />
            </p>
            <p>
              <strong>Telefone:</strong> {pedido.telefone} <br />
            </p>
            <p>
              <strong>Valor:</strong> {pedido.valor} <br />
            </p>
            <p>
              <strong>Data:</strong> {pedido.data.toLocaleDateString()} <br />
            </p>
            {/* Formata a data como string */}
            <p>
              <strong>Detalhes:</strong>{' '}
              {pedido.detalhes || 'Nenhum detalhe disponível'}{' '}
            </p>
            <br />
            {/* Verifica se há detalhes disponíveis */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosPage;
