'use client';
import axios from 'axios';

import Image from 'next/image';
import React, { useEffect, useState, FormEvent } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { PedidoService } from '../../service/PedidoService';
import { format } from 'date-fns';
import Notification from './Notification';
import { Pedido } from '@/app/types/PedidoTypes';
import ErrorMessage from './ErrorMessage';

interface EditarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  pedidoId: number | null;
  onClose?: () => void;
}

const pedidoService = new PedidoService();

const EditarModal: React.FC<EditarModalProps> = ({
  isOpen,
  onRequestClose,
  pedidoId,
  onClose,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [numero, setNumero] = useState<number>(0);
  const [nome, setNome] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [valor, setValor] = useState<number>(0);
  const [detalhes, setDetalhes] = useState<string>('');
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  useEffect(() => {
    if (isOpen && pedidoId !== null && !isFetching) {
      setIsFetching(true);
      pedidoService
        .obterPorId(pedidoId)
        .then((response) => {
          const pedido: Pedido = response.data;
          setNumero(pedido.numero || 0);
          setNome(pedido.nome || '');
          setTelefone(pedido.telefone || '');
          setValor(pedido.valor || 0);
          setDetalhes(pedido.detalhes || '');
          setStartDate(pedido.data ? new Date(pedido.data) : new Date());
        })
        .catch((error) => {
          console.error('Erro ao obter pedido:', error);
          <ErrorMessage message="Erro ao obter pedido. Por favor, tente novamente." />;
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  }, [isOpen, pedidoId]);

  useEffect(() => {
    if (notificationVisible) {
      const timer = setTimeout(() => {
        setNotificationVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationVisible]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!numero || !nome || !telefone || !valor || !startDate) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dataEntregaFormatada = format(startDate, 'yyyy-MM-dd');

    const pedidoAtualizado = {
      numero,
      nome,
      data: dataEntregaFormatada,
      telefone,
      valor,
      detalhes,
    };

    try {
      if (pedidoId !== null) {
        await pedidoService.atualizarPorId(pedidoId, pedidoAtualizado);
        console.log('Pedido atualizado com sucesso');
        setNumero(0);
        setNome('');
        setTelefone('');
        setValor(0);
        setDetalhes('');
        setStartDate(new Date());
        setNotificationVisible(true);
        setTimeout(() => {
          onRequestClose();
          onClose;
        }, 500);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Erro ao atualizar pedido:', error.message);
      } else {
        console.error('Erro inesperado:', error);
      }
      alert('Erro ao atualizar pedido. Por favor, tente novamente.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose || onRequestClose}
      contentLabel="Editar Pedido"
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-[#F2F2F2] p-6 rounded-lg shadow-lg w-[600px]">
        <div className="flex items-center space-x-2 mb-5">
          <div className="flex-shrink-0">
            <Image
              src="/dec_um.svg"
              width={5}
              height={2}
              alt="Decoração"
              className="object-contain"
            />
          </div>
          <h2 className="text-[#025213] font-poppins font-medium text-3xl">
            Editar Pedido
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex mb-4 space-x-6">
            <div className="flex-1">
              <label
                className="block text-lg font-semibold text-[#025213] mb-2"
                htmlFor="numero"
              >
                Número do Pedido
              </label>
              <input
                type="number"
                id="numero"
                placeholder="Número do pedido"
                value={numero}
                onChange={(e) => setNumero(parseInt(e.target.value))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg text-gray-500"
                required
              />
            </div>
            <div className="flex-1 relative">
              <label
                className="block font-semibold text-[#025213] text-lg mb-2"
                htmlFor="data-entrega"
              >
                Data de Entrega
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-400 text-lg pr-10 text-gray-500"
                  required
                />
                <FaCalendarAlt className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 text-lg" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold text-[#025213] text-lg mb-2"
              htmlFor="nome"
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              placeholder="Nome do pedido"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg text-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold text-[#025213] text-lg mb-2"
              htmlFor="telefone"
            >
              Telefone
            </label>
            <input
              type="tel"
              id="telefone"
              placeholder="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg text-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold text-[#025213] text-lg mb-2"
              htmlFor="valor"
            >
              Valor
            </label>
            <input
              type="text"
              id="valor"
              placeholder="R$"
              value={valor}
              onChange={(e) => setValor(parseFloat(e.target.value))}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg text-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-semibold text-[#025213] text-lg mb-2"
              htmlFor="detalhes"
            >
              Detalhes
            </label>
            <textarea
              id="detalhes"
              placeholder="Detalhes do pedido"
              value={detalhes}
              onChange={(e) => setDetalhes(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg text-gray-500"
            ></textarea>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#41A156] to-[#41A18D] text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              Atualizar
            </button>
            <button
              type="button"
              onClick={onRequestClose}
              className="px-6 py-3 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
      <Notification
        message="PEDIDO<br />ATUALIZADO<br />COM SUCESSO!"
        isVisible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </Modal>
  );
};

export default EditarModal;
