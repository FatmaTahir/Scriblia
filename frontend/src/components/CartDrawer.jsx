import React from "react";
import { useNavigate } from "react-router-dom";
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
    decreaseQuantity
  } = useCart();

  return (

    <div
      className={`fixed right-0 top-0 h-full w-full sm:w-[300px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
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
          <IoClose className="text-2xl text-gray-700" />
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

          cart.map((item) => (

            <div
              key={item.id}
              className="border-b border-gray-100 pb-5"
            >

              <div className="flex gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />

                <div className="flex-1">

                  <h3 className="text-sm font-medium">
                    {item.name}
                  </h3>

                  <p className="text-gray-500  mt-1">
                    Rs {item.price}.00
                  </p>

                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                >
                  <RiDeleteBin6Line className="text-2xl text-gray-500 hover:text-red-600" />
                </button>

              </div>

              {/* Quantity */}

              <div className="flex mt-3">

                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="border px-3"
                >
                  <FiMinus />
                </button>

                <div className="border px-6 py-2">

                  {item.quantity}

                </div>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="border px-3"
                >
                  <GoPlus />
                </button>

              </div>

            </div>

          ))

        )}

      </div>

      {/* Footer */}

      <div className="p-6 border-t">

        <div className="flex justify-between mb-4">

          <span>Subtotal</span>

          <span className="font-bold">
            Rs {getCartTotal().toLocaleString()}.00
          </span>

        </div>

        <motion.button
          whileHover={{ y: -4 }}
          onClick={() => {
            onClose();
            navigate("/cart");
          }}
          className="w-full border py-3 rounded-xl mb-3"
        >
          View Cart
        </motion.button>

        <button
          onClick={() => {
            onClose();
            navigate("/checkout");
          }}
          disabled={cart.length === 0}
          className="w-full bg-pink-500 text-white py-3 rounded-xl"
        >
          Checkout
        </button>

      </div>

    </div>

  );

};

export default CartDrawer;