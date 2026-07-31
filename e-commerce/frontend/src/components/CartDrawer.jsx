import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <div
      className={`fixed right-0 top-0 h-full w-full sm:w-[300px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-pink-500">
        <h2 className="text-lg font-bold text-gray-800 dancing-script">
          Shopping Cart
        </h2>

        <button
          onClick={onClose}
          className="text-gray-400 hover:text-pink-500"
        >
          <IoClose className="text-2xl " />
        </button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-gray-400">
            <HiOutlineShoppingCart className="text-7xl opacity-40 text-gray-700" />

            <p
              className="text-lg font-medium"
              style={{ fontFamily: "Playfair Display" }}
            >
              Your cart is completely empty
            </p>
          </div>
        ) : (
          cart.map((item) => {
            const maxStock = item.stock ?? item.maxStock;
            const isMaxReached =
              maxStock !== undefined && item.quantity >= maxStock;

            return (
              <div
                key={item.id}
                className="border-b border-gray-100 pb-5"
              >
                <div className="flex gap-4">
                  {/* Clickable Product Image */}
                  <Link
                    to={`/product/${item.id}`}
                    onClick={onClose}
                    className="shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  </Link>

                  <div className="flex-1">
                    {/* Clickable Product Name */}
                    <Link to={`/product/${item.id}`} onClick={onClose}>
                      <h3
                        className="text-sm font-medium hover:text-pink-500 transition-colors cursor-pointer"
                        style={{ fontFamily: "Playfair Display" }}
                      >
                        {item.name}
                      </h3>
                    </Link>

                    <p
                      className="text-gray-500 mt-1"
                      style={{ fontFamily: "Playfair Display" }}
                    >
                      Rs {item.price}.00
                    </p>
                  </div>

                  <button onClick={() => removeFromCart(item.id)}>
                    <RiDeleteBin6Line className="text-2xl text-gray-500 hover:text-red-600" />
                  </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-start mt-3">
                  <div className="flex">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="border px-3 hover:bg-gray-50"
                      style={{ fontFamily: "Playfair Display" }}
                    >
                      <FiMinus />
                    </button>

                    <div
                      className="border px-6 py-2"
                      style={{ fontFamily: "Playfair Display" }}
                    >
                      {item.quantity}
                    </div>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      disabled={isMaxReached}
                      className={`border px-3 ${
                        isMaxReached
                          ? "opacity-40 cursor-not-allowed bg-gray-100"
                          : "hover:bg-gray-50"
                      }`}
                      style={{ fontFamily: "Playfair Display" }}
                    >
                      <GoPlus />
                    </button>
                  </div>

                  {isMaxReached && (
                    <span
                      className="text-[10px] text-red-500 mt-1"
                      style={{ fontFamily: "Playfair Display" }}
                    >
                      Max stock limit reached
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t">
        <div className="flex justify-between mb-4">
          <span style={{ fontFamily: "Playfair Display" }}>Subtotal</span>

          <span
            className="font-bold"
            style={{ fontFamily: "Playfair Display" }}
          >
            Rs {getCartTotal().toLocaleString()}.00
          </span>
        </div>

        <motion.button
          whileHover={{ y: -4 }}
          onClick={() => {
            onClose();
            navigate("/cart");
          }}
          className="w-full border py-3 rounded-3xl mb-3"
          style={{ fontFamily: "Playfair Display" }}
        >
          View Cart
        </motion.button>

        <motion.button
          whileHover={{ y: -4 }}
          onClick={() => {
            onClose();
            navigate("/checkout");
          }}
          disabled={cart.length === 0}
          className="w-full bg-pink-500 text-white py-3 rounded-3xl disabled:opacity-50"
          style={{ fontFamily: "Playfair Display" }}
        >
          Checkout
        </motion.button>
      </div>
    </div>
  );
};

export default CartDrawer;