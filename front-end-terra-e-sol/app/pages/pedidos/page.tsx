// app/pages/pedidos/page.tsx

'use client';

import { PedidoService } from '@/service/PedidoService';
import { useEffect, useState } from 'react';
// Ajuste o caminho se necessário

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
        setPedidos(response.data);
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
            <strong>Descrição:</strong> {pedido.nome} <br />
            <strong>Quantidade:</strong> {pedido.numero}
            {/* Adicione mais detalhes conforme necessário */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosPage;
