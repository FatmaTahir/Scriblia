import React, { useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { IoClose, IoAdd, IoRemove } from "react-icons/io5";
import { Link } from "react-router-dom";
import CheckoutSection from "./CheckoutSection"; 

const Cart = () => {
  // 1. Added clearCart and dynamic handleDecrease dependencies from context
  const { cart, removeFromCart, addToCart, getCartTotal, clearCart, decrementQuantity } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const checkoutSectionRef = useRef(null);

  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      // Directs context state to smoothly decrease item count by 1
      decrementQuantity ? decrementQuantity(item.id) : addToCart({ ...item, quantity: -1 });
    }
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
    setTimeout(() => {
      checkoutSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-32 pb-12 px-6 sm:px-16 transition-all duration-500">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* ================= SHOPPING CART DETAILS ================= */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-wide">Your Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 space-y-4">
              <p className="text-gray-400 font-medium">Your shopping cart looks a bit empty!</p>
              <Link to="/Category" className="inline-block bg-pink-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-pink-600 transition-all text-sm">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* List of Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex gap-4 items-center relative group">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl border" />
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate pr-6">{item.name}</h3>
                      <p className="text-pink-500 font-bold text-sm mt-2">Rs {item.price.toLocaleString()}.00</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-gray-50 border p-1 rounded-lg">
                      <button onClick={() => handleDecrease(item)} className="p-1 hover:text-pink-500 transition-colors">
                        <IoRemove />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => addToCart(item)} className="p-1 hover:text-pink-500 transition-colors">
                        <IoAdd />
                      </button>
                    </div>

                    <button onClick={() => removeFromCart(item.id)} className="absolute right-4 top-4 text-gray-400 hover:text-red-500 transition-colors">
                      <IoClose className="text-lg" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Order Summary Summary Panel */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 lg:sticky lg:top-28">
                <h2 className="text-lg font-bold text-gray-800 uppercase tracking-wider border-b pb-3">Order Summary</h2>
                
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold">Rs {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 border-b pb-3">
                  <span>Shipping Fee:</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-gray-700">Estimated Total:</span>
                  <span className="text-xl font-bold text-pink-500">Rs {getCartTotal().toLocaleString()}</span>
                </div>

                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-pink-500 text-white font-semibold py-3 rounded-xl hover:bg-pink-600 transition-all text-sm shadow-md shadow-pink-100 mt-4"
                >
                  Proceed To Checkout
                </button>
              </div>

            </div>
          )}
        </div>

        {/* ================= CONDITIONALLY RENDERED COMPONENT ================= */}
        {showCheckout && cart.length > 0 && (
          <CheckoutSection 
            cartItems={cart} 
            clearCart={clearCart} 
            getCartTotal={getCartTotal} 
            checkoutSectionRef={checkoutSectionRef} 
          />
        )}

      </div>
    </div>
  );
};

export default Cart;