import { useState, useEffect, ChangeEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
  onSearchChange: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    onSearchChange(searchTerm);
  }, [searchTerm]); // Remover onSearchChange das dependências

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Buscar pedidos..."
        value={searchTerm}
        onChange={handleChange}
        className="pl-10 pr-12 py-2 border border-gray-300 rounded-lg shadow-sm text-lg w-full max-w-lg text-[#41A156] placeholder-[#41A156]"
      />
      <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-[#41A156]" />
    </div>
  );
};

export default Search;
