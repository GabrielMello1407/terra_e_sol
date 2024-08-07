'use client';

import Image from 'next/image';
import React, { useEffect, useState, FormEvent } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import { PedidoService } from '../../service/PedidoService';
import { format } from 'date-fns';
import { formatCurrency } from '../utils/formatCurrency';
import { handleValorChange } from '../utils/handleValorChange';
import { formatPhoneNumber } from '../utils/formatPhoneNumber';
import Notification from './CreateSuccessfully';

interface CadastrarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CadastrarModal: React.FC<CadastrarModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [numero, setNumero] = useState<number>(0);
  const [nome, setNome] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [valor, setValor] = useState<number>(0);
  const [detalhes, setDetalhes] = useState<string>('');
  const [notificationVisible, setNotificationVisible] =
    useState<boolean>(false);

  const pedidoService = new PedidoService();

  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

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

    const novoPedido = {
      numero,
      nome,
      data: new Date(dataEntregaFormatada),
      telefone,
      valor,
      detalhes,
    };

    try {
      const response = await pedidoService.criarPedido(novoPedido);
      console.log('Pedido criado com sucesso:', response.data);
      setNumero(0);
      setNome('');
      setTelefone('');
      setValor(0);
      setDetalhes('');
      setStartDate(new Date());
      setNotificationVisible(true);
      onRequestClose();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      alert('Erro ao criar pedido. Por favor, tente novamente.');
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Cadastrar Pedido"
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
              Cadastrar Pedido
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
                  onChange={(e) => setNumero(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 text-gray-400 text-lg pr-10"
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
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
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
                value={formatPhoneNumber(telefone)}
                onChange={(e) => setTelefone(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
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
                value={formatCurrency(valor)}
                onChange={(e) => handleValorChange(e, setValor)}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg text-gray-400"
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
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
              ></textarea>
            </div>
            <div className="flex justify-between mt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-[#41A156] to-[#41A18D] text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                Cadastrar
              </button>
              <button
                type="button"
                onClick={onRequestClose}
                className="px-6 py-3 bg-gray-300 text-gray-700 font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Notification
        message="Pedido cadastrado com sucesso!"
        isVisible={notificationVisible}
        onClose={() => setNotificationVisible(false)}
      />
    </>
  );
};

export default CadastrarModal;
