import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";

const SearchDrawer = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchResults = [
    { id: 1, name: "Panda Dancing - Gel Pen", price: 145, image: "https://placeholder.co/150" },
    { id: 2, name: "Kawai Pen Holder - Desk Organize", price: 795, image: "https://placeholder.co/150" },
    { id: 3, name: "Sanrio Characters - Erasable Press Gel Pen", price: 129, image: "https://placeholder.co/150" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full sm:w-[350px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-pink-500">
        <h2  className="font-bold text-gray-800 text-lg dancing-script">Search Our Site</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-pink-500 transition-colors">
          <IoClose className="text-2xl" />
        </button>
      </div>

      <div className="px-6 pb-6 mt-3">
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-2.5 pr-12 border border-gray-400 rounded-full focus:outline-none focus:border-gray-600 text-sm tracking-wide text-gray-800 placeholder-gray-400 transition-all"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors">
            <IoSearch className="text-xl" />
          </button>
        </form>
      </div>

      <div className="px-6 py-3 border-t border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-md font-bold text-gray-800 dancing-script">Search results</h3>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-gray-100">
        {searchQuery.trim() === "" ? (
          <div className="py-8 text-center text-sm text-gray-400">
            Type something to discover beautiful stationery...
          </div>
        ) : (
          searchResults.map((item) => (
            <div key={item.id} className="flex gap-4 items-center py-4 group cursor-pointer">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md bg-gray-50 border border-gray-100" />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-800 truncate group-hover:text-pink-500 transition-colors">{item.name}</h4>
                <p className="text-sm font-semibold text-gray-900 mt-1">Rs {item.price.toFixed(2)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchDrawer;