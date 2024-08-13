import React, { useEffect, useState } from 'react';
import Calendar, { CalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Pedido } from '@/app/types/PedidoTypes';
import { PedidoService } from '../../service/PedidoService';
import PedidoList from './PedidosDoDiaList';
import ErrorMessage from './ErrorMessage';
import { format } from 'date-fns';
import 'animate.css';
import CadastrarModal from './ModalCadastro';

const pedidoService = new PedidoService();

export default function PedidosDoDia() {
  const [date, setDate] = useState<Date | null>(new Date());
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchPedidos = async (selectedDate: Date) => {
    setLoading(true);
    setError(null);

    try {
      const response = await pedidoService.listarTodos();
      const pedidosData = response.data;

      const filteredPedidos = pedidosData.filter((pedido) => {
        const pedidoDate = new Date(pedido.data);
        return pedidoDate.toDateString() === selectedDate.toDateString();
      });

      setPedidos(filteredPedidos);
    } catch (err) {
      setError('Erro ao buscar pedidos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (date) {
      fetchPedidos(date);
    }
  }, [date]);

  const handleDateChange: CalendarProps['onChange'] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (Array.isArray(value) && value[0] instanceof Date) {
      setDate(value[0]);
    }
  };

  const handleAdicionarPedido = () => {
    setIsModalOpen(true);
  };

  const handlePedidoCreated = () => {
    setIsModalOpen(false);
    fetchPedidos(date || new Date()); // Atualiza a lista após criar um pedido
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-8 p-4">
      <div className="flex flex-col items-center md:w-1/3">
        <h2 className="text-4xl font-bold mb-4 text-[#41A156]">
          Filtrar por data
        </h2>
        <Calendar
          onChange={handleDateChange}
          value={date}
          calendarType="hebrew"
          tileClassName={({ date: tileDate, view }) =>
            view === 'month'
              ? `text-[#41A156] ${
                  tileDate.getDay() === 0 ? 'text-[#EE4137]' : 'text-[#41A156]'
                } ${
                  tileDate.toDateString() === new Date().toDateString()
                    ? 'bg-[#DDDDDD] font-bold'
                    : ''
                }`
              : ''
          }
          navigationLabel={({ date }) => (
            <span className="text-[#41A156]">{format(date, 'MMMM yyyy')}</span>
          )}
          prevLabel={<span className="text-[#41A156] font-bold">{'<'}</span>}
          nextLabel={<span className="text-[#41A156] font-bold">{'>'}</span>}
        />
      </div>

      <div className="md:w-2/3 mt-8 md:mt-0">
        <h2 className="text-4xl font-bold mb-4 text-gray-500">
          Pedidos para {date ? format(date, 'dd/MM/yyyy') : 'Selecionar Data'}
        </h2>
        {loading ? (
          <p className="animate__animated animate__flipInY">Carregando...</p>
        ) : error ? (
          <ErrorMessage message={error} />
        ) : pedidos.length === 0 ? (
          <p>Nenhum pedido encontrado para esta data.</p>
        ) : (
          <PedidoList
            pedidos={pedidos}
            adicionarPedido={handleAdicionarPedido}
          />
        )}
      </div>
      <CadastrarModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onPedidoCriado={handlePedidoCreated}
      />
    </div>
  );
}
