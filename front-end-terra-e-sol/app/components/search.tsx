import { FaSearch } from 'react-icons/fa';

export default function Search() {
  return (
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
  );
}
