import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { MdPersonOutline } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { useCart } from "../context/CartContext";
import logo from '../assets/logo.png';
import CategoryDrawer from "./CategoryDrawer";
import SearchDrawer from "./SearchDrawer";
import AccountDrawer from "./AccountDrawer";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const { getCartCount } = useCart();

  const isAnyDrawerOpen = isMenuOpen || isCartOpen || isSearchOpen || isAccountOpen;

  const closeAllDrawers = () => {
    setIsMenuOpen(false);
    setIsCartOpen(false);
    setIsSearchOpen(false);
    setIsAccountOpen(false);
  };

  return (
    <>
      {/* Primary Navigation Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl h-20 flex items-center justify-between px-8 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg z-40">
        <div className="absolute flex gap-4 text-xl items-center left-[5%]">
          <VscThreeBars 
            onClick={() => setIsMenuOpen(true)} 
            className="cursor-pointer text-2xl hover:text-pink-500 hover:scale-110 transition-transform duration-200" 
          />
        </div>

        <NavLink className="absolute left-[20%]" to="/">
         {/* <img className="cursor-pointer" src={logo} alt="Logo" /> */}
         <h1 
         className="text-4xl text-black font-bold dancing-script">SCRIBLIA</h1>
        </NavLink>

        <div className="absolute flex gap-4 text-xl items-center right-[10%]">
          <div onClick={() => setIsSearchOpen(true)} className="cursor-pointer hover:scale-110 transition-transform duration-200">
            <IoSearch className="text-2xl hover:text-pink-500" />
          </div>

          <div onClick={() => setIsAccountOpen(true)} className="cursor-pointer hover:scale-110 transition-transform duration-200">
            <MdPersonOutline className="text-3xl hover:text-pink-500" />
          </div>

          <div className="relative cursor-pointer group" onClick={() => setIsCartOpen(true)}>
            <HiOutlineShoppingCart className="text-2xl group-hover:text-pink-500 hover:scale-110 transition-transform duration-200" />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-2 bg-pink-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                {getCartCount()}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Dimmed Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isAnyDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeAllDrawers}
      />

      {/* Isolated Drawer Components */}
      <CategoryDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SearchDrawer isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AccountDrawer isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;