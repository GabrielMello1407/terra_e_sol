import React, { useState, useEffect, useCallback } from 'react';
import { Pedido } from '@/app/types/PedidoTypes';
import { format } from 'date-fns';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import { PedidoService } from '../../service/PedidoService';
import EditarModal from './ModalEditarCadastro';
import Header from './Header';

const pedidoService = new PedidoService();

export default function Homepage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [pedidosFiltrados, setPedidosFiltrados] = useState<Pedido[]>([]);
  const [selectedPedidoId, setSelectedPedidoId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchPedidos = async () => {
    try {
      const response = await pedidoService.listarTodos();
      setPedidos(response.data);
      setPedidosFiltrados(response.data);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const handleSearchChange = (searchTerm: string) => {
    const filtered = pedidos.filter(
      (pedido) =>
        pedido.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pedido.numero != null &&
          String(pedido.numero)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())),
    );
    setPedidosFiltrados(filtered);
  };

  const updatePedidoStatus = useCallback(
    async (id: number, pronto: boolean) => {
      const pedido = pedidos.find((p) => p.id === id);

      if (!pedido) {
        console.error('Pedido não encontrado');
        return;
      }

      try {
        await pedidoService.atualizarPorId(id, { ...pedido, pronto });
        setPedidos((prevPedidos) =>
          prevPedidos.map((p) => (p.id === id ? { ...p, pronto } : p)),
        );
      } catch (error) {
        console.error('Erro ao atualizar o pedido:', error);
      }
    },
    [pedidos],
  );

  const handleProntoClick = (id: number) => {
    const pedido = pedidos.find((p) => p.id === id);
    if (pedido) {
      updatePedidoStatus(id, !pedido.pronto);
    }
  };

  const handleEditClick = (id: number) => {
    setSelectedPedidoId(id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    try {
      await pedidoService.deletarPorId(id);
      setPedidos((prevPedidos) => prevPedidos.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Erro ao deletar o pedido:', error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPedidoId(null);
  };

  return (
    <div className="p-4">
      <Header onSearchChange={handleSearchChange} />
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pedidosFiltrados.map((pedido) => (
          <div
            key={pedido.id}
            className={`p-4 rounded shadow-md ${
              pedido.pronto ? 'bg-[#c8e6c9]' : 'bg-white'
            } flex flex-col space-y-4`}
          >
            <p>
              <strong className="text-2xl text-gray-400">Nome:</strong>{' '}
              <span className="text-2xl font-medium text-[#41A156]">
                {pedido.nome}
              </span>
            </p>
            <p>
              <strong className="text-2xl text-gray-400">Data:</strong>{' '}
              <span className="text-2xl font-medium text-[#41A156]">
                {format(new Date(pedido.data), 'dd/MM/yyyy')}
              </span>
            </p>
            <p>
              <strong className="text-2xl text-gray-400">Número:</strong>{' '}
              <span className="text-2xl font-medium text-[#41A156]">
                {pedido.numero}
              </span>
            </p>
            <p>
              <strong className="text-2xl text-gray-400">Telefone:</strong>{' '}
              <span className="text-2xl font-medium text-[#41A156]">
                {pedido.telefone}
              </span>
            </p>
            <p>
              <strong className="text-2xl text-gray-400">Valor:</strong>{' '}
              <span className="text-2xl font-medium text-[#41A156]">
                R$ {pedido.valor.toFixed(2)}
              </span>
            </p>
            <p>
              <strong className="text-2xl text-gray-400">Detalhes:</strong>{' '}
              <span className="text-2xl font-medium text-[#41A156]">
                {pedido.detalhes}
              </span>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => handleProntoClick(pedido.id)}
                className="text-xl bg-[#41A156] text-white p-2 rounded flex items-center justify-center space-x-1 hover:bg-[#359745] flex-1 min-w-[120px]"
              >
                <FaCheck />
                <span>Pronto</span>
              </button>

              <button
                onClick={() => handleEditClick(pedido.id)}
                className="text-xl bg-[#41A156] text-white p-2 rounded flex items-center justify-center space-x-1 hover:bg-[#359745] flex-1 min-w-[120px]"
              >
                <FaEdit />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDeleteClick(pedido.id)}
                className="text-xl bg-[#EE4137] text-white p-2 rounded flex items-center justify-center space-x-1 hover:bg-[#d73a30] flex-1 min-w-[120px]"
              >
                <FaTrash />
                <span>Deletar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && selectedPedidoId !== null && (
        <EditarModal
          pedidoId={selectedPedidoId}
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
