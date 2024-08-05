'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';

// Define as props esperadas pelo componente
interface CadastrarModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

// Define o elemento principal da aplicação para acessibilidade
const CadastrarModal: React.FC<CadastrarModalProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  useEffect(() => {
    // Configurar o app element
    Modal.setAppElement('#__next');
  }, []);

  return (
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

        <form>
          <div className="flex mb-4 space-x-6">
            <div className="flex-1">
              <label
                className="block text-lg font-semibold text-[#025213] mb-2"
                htmlFor="numero"
              >
                Número do Pedido
              </label>
              <input
                type="text"
                id="numero"
                placeholder="Número do pedido"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
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
              type="number"
              id="valor"
              placeholder="R$"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
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
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 placeholder-gray-400 text-lg"
            ></textarea>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-[#41A156] to-[#41A18A] text-white font-poppins rounded-lg hover:from-[#41A18A] hover:to-[#41A156] transition-colors font-bold text-lg"
            >
              Cadastrar
            </button>
            <button
              onClick={onRequestClose}
              className="px-6 py-3 bg-red-600 text-white rounded-lg text-lg hover:bg-red-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CadastrarModal;
