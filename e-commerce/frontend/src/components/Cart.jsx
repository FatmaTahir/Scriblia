import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import CheckoutSection from "./CheckoutSection";

const Cart = () => {
  const {
    cart,
    removeFromCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);
  const checkoutSectionRef = useRef(null);

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      decreaseQuantity(item.id);
    }
  };

  const handleIncrease = (item) => {
    increaseQuantity(item.id);
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);

    setTimeout(() => {
      checkoutSectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl text-center dancing-script font-bold text-gray-800 mb-12"
        >
          Shopping Cart
        </motion.h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-16 flex flex-col items-center">
            <HiOutlineShoppingCart className="text-7xl text-gray-400 mb-5" />

            <h2
              className="text-2xl text-gray-500"
              style={{ fontFamily: "Playfair Display" }}
            >
              Your cart is completely empty
            </h2>

            <Link
              to="/category"
              className="mt-8 bg-pink-500 hover:bg-pink-600 transition text-white px-8 py-3 rounded-3xl"
              style={{ fontFamily: "Playfair Display" }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm p-24 pt-1">
                <div>
                  {cart.map((item) => {
                    const maxStock = item.stock ?? item.maxStock;
                    const isMaxReached =
                      maxStock !== undefined && item.quantity >= maxStock;

                    return (
                      <div key={item.id} className="pb-6">
                        <div className="flex gap-5 border-b py-4">
                          {/* Clickable Product Image */}
                          <Link to={`/product/${item.id}`} className="shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-24 h-24 rounded-2xl object-cover hover:opacity-85 transition-opacity cursor-pointer"
                            />
                          </Link>

                          <div className="flex-1">
                            {/* Clickable Product Name */}
                            <Link to={`/product/${item.id}`}>
                              <h3
                                className="text-lg text-gray-800 hover:text-pink-500 transition-colors cursor-pointer"
                                style={{ fontFamily: "Playfair Display" }}
                              >
                                {item.name}
                              </h3>
                            </Link>

                            <p
                              className="text-pink-500"
                              style={{ fontFamily: "Playfair Display" }}
                            >
                              Rs {item.price}.00
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex flex-col items-start mt-3 mb-1">
                              <div className="flex">
                                <button
                                  onClick={() => handleDecrease(item)}
                                  className="border border-gray-300 px-4 py-2 hover:bg-gray-50"
                                >
                                  <FiMinus />
                                </button>

                                <div className="border-t border-b border-gray-300 px-7 py-2">
                                  {item.quantity}
                                </div>

                                <button
                                  onClick={() => handleIncrease(item)}
                                  disabled={isMaxReached}
                                  className={`border border-gray-300 px-4 py-2 ${
                                    isMaxReached
                                      ? "opacity-40 cursor-not-allowed bg-gray-100"
                                      : "hover:bg-gray-50"
                                  }`}
                                >
                                  <GoPlus />
                                </button>
                              </div>

                              {isMaxReached && (
                                <span
                                  className="text-xs text-red-500 mt-1"
                                  style={{ fontFamily: "Playfair Display" }}
                                >
                                  Max available stock reached ({maxStock})
                                </span>
                              )}
                            </div>
                          </div>

                          <button onClick={() => removeFromCart(item.id)}>
                            <RiDeleteBin6Line className="text-2xl text-gray-400 hover:text-red-500 transition text-center" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-3xl shadow-lg p-8 h-fit sticky top-32">
                <h2 className="text-2xl dancing-script font-bold text-gray-800 mb-8 text-center">
                  Order Summary
                </h2>

                <div className="flex justify-between mb-4 text-gray-700">
                  <span style={{ fontFamily: "Playfair Display" }}>
                    Subtotal
                  </span>

                  <span style={{ fontFamily: "Playfair Display" }}>
                    Rs {getCartTotal().toLocaleString()}.00
                  </span>
                </div>

                <div
                  className="flex justify-between mb-6 text-gray-700"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  <span>Shipping</span>

                  <span
                    className="text-green-600 font-medium"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    Free
                  </span>
                </div>

                <hr className="mb-6" />

                <div
                  className="flex justify-between text-lg mb-8"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  <span>Total</span>

                  <span
                    className="text-pink-500"
                    style={{ fontFamily: "Playfair Display" }}
                  >
                    Rs {getCartTotal().toLocaleString()}.00
                  </span>
                </div>

                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProceedToCheckout}
                  style={{ fontFamily: "Playfair Display" }}
                  className="w-full bg-pink-500 hover:bg-pink-600 transition-colors duration-300 text-white text-sm py-3 rounded-3xl shadow-lg"
                >
                  Proceed To Checkout
                </motion.button>
              </div>
            </div>

            {showCheckout && (
              <div ref={checkoutSectionRef} className="mt-16">
                <CheckoutSection />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;