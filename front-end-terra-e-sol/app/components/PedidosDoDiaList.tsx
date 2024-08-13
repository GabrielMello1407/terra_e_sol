import React, { useState, useEffect, useCallback } from 'react';
import { Pedido } from '@/app/types/PedidoTypes';
import { format } from 'date-fns';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import EditarModal from './ModalEditarCadastro';
import { PedidoService } from '../../service/PedidoService';

interface PedidoListProps {
  pedidos: Pedido[];
  adicionarPedido: () => void;
}

const pedidoService = new PedidoService(); // Cria uma instância do serviço

const PedidoList: React.FC<PedidoListProps> = ({ pedidos }) => {
  const [pedidosState, setPedidos] = useState<Pedido[]>(pedidos);
  const [prontoId, setProntoId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedPedidoId, setSelectedPedidoId] = useState<number | null>(null);
  const [timeouts, setTimeouts] = useState<Map<number, NodeJS.Timeout>>(
    new Map(),
  );

  useEffect(() => {
    setPedidos(pedidos);
  }, [pedidos]);

  // Atualiza o pedido e o estado de 'Pronto', e gerencia o temporizador
  const updatePedidoStatus = useCallback(
    async (id: number, pronto: boolean) => {
      const pedido = pedidosState.find((p) => p.id === id);

      if (!pedido) {
        console.error('Pedido não encontrado');
        return;
      }

      try {
        await pedidoService.atualizarPorId(id, { ...pedido, pronto });
        setPedidos((prevPedidos) =>
          prevPedidos.map((p) => (p.id === id ? { ...p, pronto } : p)),
        );
        setProntoId(pronto ? id : null);

        if (pronto) {
          scheduleDeletion(id);
        } else {
          cancelDeletion(id);
        }
      } catch (error) {
        console.error('Erro ao atualizar o pedido:', error);
        setProntoId(pronto ? id : null);
      }
    },
    [pedidosState],
  );

  // Agenda a exclusão do pedido após 1 hora
  const scheduleDeletion = (id: number) => {
    const timeoutId = setTimeout(async () => {
      try {
        await pedidoService.deletarPorId(id);
        setPedidos((prevPedidos) => prevPedidos.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao deletar o pedido:', error);
      }
    }, 60 * 60 * 1000); // 1 hora em milissegundos

    setTimeouts((prevTimeouts) => new Map(prevTimeouts).set(id, timeoutId));
  };

  // Cancela a exclusão agendada do pedido
  const cancelDeletion = (id: number) => {
    const timeoutId = timeouts.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeouts((prevTimeouts) => {
        const newTimeouts = new Map(prevTimeouts);
        newTimeouts.delete(id);
        return newTimeouts;
      });
    }
  };

  // Manipuladores de eventos para botões
  const handleProntoClick = (id: number) => {
    const pedido = pedidosState.find((p) => p.id === id);
    if (pedido) {
      updatePedidoStatus(id, !pedido.pronto);
    }
  };

  const handleEditClick = (id: number) => {
    setSelectedPedidoId(id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id: number) => {
    if (prontoId === null) {
      try {
        await pedidoService.deletarPorId(id);
        setPedidos((prevPedidos) => prevPedidos.filter((p) => p.id !== id));
      } catch (error) {
        console.error('Erro ao deletar o pedido:', error);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPedidoId(null);
  };

  // Limpeza dos timeouts ao desmontar o componente
  useEffect(() => {
    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [timeouts]);

  return (
    <>
      <ul className="space-y-4">
        {pedidosState.map((pedido) => (
          <li
            key={pedido.id}
            className={`bg-white p-4 rounded shadow-md ${
              pedido.pronto ? 'bg-[#c8e6c9]' : ''
            }`}
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
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleProntoClick(pedido.id)}
                disabled={prontoId !== null && prontoId !== pedido.id}
                className={`text-xl p-2 rounded flex items-center space-x-1 ${
                  pedido.pronto ? 'bg-[#c8e6c9]' : 'bg-[#41A156]'
                } text-white hover:bg-[#359745]`}
              >
                <FaCheck />
                <span>Pronto</span>
              </button>

              <button
                onClick={() => handleEditClick(pedido.id)}
                disabled={prontoId !== null}
                className="text-xl bg-[#41A156] text-white p-2 rounded flex items-center space-x-1 hover:bg-[#359745]"
              >
                <FaEdit />
                <span>Editar</span>
              </button>
              <button
                onClick={() => handleDeleteClick(pedido.id)}
                disabled={prontoId !== null}
                className="text-xl bg-[#EE4137] text-white p-2 rounded flex items-center space-x-1 hover:bg-[#d73a30]"
              >
                <FaTrash />
                <span>Deletar</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedPedidoId !== null && (
        <EditarModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          pedidoId={selectedPedidoId}
        />
      )}
    </>
  );
};

export default PedidoList;
