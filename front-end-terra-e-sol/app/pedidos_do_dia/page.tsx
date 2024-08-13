// app/pages/pedidos/page.tsx

'use client';

import { PedidoService } from '@/service/PedidoService';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import PedidosDoDia from '../components/PedidosDoDia';

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

  if (loading)
    return (
      <div className="ui segment">
        <div className="ui active dimmer">
          <div className="ui text loader">Carregando...</div>
        </div>
        <p></p>
      </div>
    );
  if (error) return <p>Erro: {error}</p>;
  const handleSearchChange = (searchTerm: string) => {
    console.log(searchTerm);
  };
  return (
    <div id="__next">
      <Header showSearch={false} onSearchChange={handleSearchChange} />
      <PedidosDoDia />
    </div>
  );
};

export default PedidosPage;
