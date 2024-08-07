import React, { useState } from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import CadastrarModal from './modalCadastro';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <a href="/">
            <Image
              src="/terra_logo.svg"
              width={100}
              height={100}
              alt="Terra e Sol Logo"
              className="object-contain"
            />
          </a>
        </div>

        <div className="flex-grow mx-4">
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 placeholder:text-[#41A156]"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#42A27C]" />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0">
              <Image
                src="/dec_um.svg"
                width={5}
                height={2}
                alt="Decoração"
                className="object-contain"
              />
            </div>
            <a
              href="/pedidos_do_dia"
              className="text-[#025213] font-poppins hover:text-[#41A156] transition-colors font-bold"
            >
              Pedidos do dia
            </a>
          </div>
          <button
            onClick={openModal}
            className="px-4 py-2 bg-gradient-to-r from-[#41A156] to-[#41A18A] text-white font-poppins rounded-lg hover:from-[#41A18A] hover:to-[#41A156] transition-colors font-bold text-lg"
          >
            Cadastrar
          </button>
        </div>
      </div>
      <CadastrarModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </header>
  );
};

export default Header;
