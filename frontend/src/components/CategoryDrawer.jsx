import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const CategoryDrawer = ({ isOpen, onClose }) => {
  const categories = [

    { name: "Journals", path: "/journals" },
    { name: "Art Supplies", path: "/artSupplies" },
    { name: "Sticky Items", path: "/stickyItems" },
    { name: "Organizers", path: "/organizing" },
    { name: "Writing Essentials", path: "/pens" }
  ];

  return (
    <div style={{ fontFamily: "Playfair Display" }}

      className={`fixed left-0 top-0 h-full w-full sm:w-[280px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-pink-500">
        <h2 className="text-lg font-bold text-gray-800 dancing-script">
          Categories
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-pink-500 transition-colors">
          <IoClose className="text-2xl" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="flex flex-col">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.path}
              onClick={onClose}
              style={{ font: "PlayFair display" }}
              className="px-6 py-4 text-sm font-medium text-gray-700  hover:bg-pink-100  hover:text-pink-500 border-b border-gray-50 transition-all duration-200 "
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default CategoryDrawer;