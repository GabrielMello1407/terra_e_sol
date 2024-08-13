'use client';

import Image from 'next/image';
import CadastrarModal from './ModalCadastro';
import { useState } from 'react';
import Search from './Search';

interface HeaderProps {
  onSearchChange: (searchTerm: string) => void;
  showSearch?: boolean; // Nova prop para controlar a visibilidade da barra de busca
}

const Header: React.FC<HeaderProps> = ({
  onSearchChange,
  showSearch = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePedidoCriado = () => {
    console.log('Pedido criado!');
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-shrink-0">
          <a href="/">
            <Image
              src="/terra_logo.svg"
              width={120}
              height={120}
              alt="Terra e Sol Logo"
              className="object-contain"
            />
          </a>
        </div>

        {showSearch && <Search onSearchChange={onSearchChange} />}

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
              className="text-2xl text-[#025213] font-poppins hover:text-[#41A156] transition-colors font-bold"
            >
              Pedidos do dia
            </a>
          </div>
          <button
            onClick={openModal}
            className="text-2xl px-4 py-2 bg-gradient-to-r from-[#41A156] to-[#41A18A] text-white font-poppins rounded-lg hover:from-[#41A18A] hover:to-[#41A156] transition-colors font-bold"
          >
            Cadastrar
          </button>
        </div>
      </div>
      <CadastrarModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onPedidoCriado={handlePedidoCriado}
      />
    </header>
  );
};

export default Header;
