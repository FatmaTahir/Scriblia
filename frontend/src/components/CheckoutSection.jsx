import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion"; 
import Breadcrumb from "./Breadcrumb";


const CheckoutSection = () => {

  const {
    cartItems,
    clearCart,
  } = useCart();

const location= useLocation();
console.log(location.state);
 const buyNowItem = location.state?.items;
  const checkoutItems = buyNowItem || cartItems;

const firstItem = checkoutItems[0];
const categoryNames = {
  pens: "Writing Essentials",
  journals: "Journals",
  organizing: "Organizing",
  artSupplies: "Art Supplies",
  stickyItems: "Sticky Items",
};
const breadcrumbItems = firstItem
  ? [
      { name: "Home", path: "/" },
      {
        name: categoryNames[firstItem.category] || firstItem.category,
        path: `/${firstItem.category}`,
      },
      {
        name: firstItem.name,
        path: `/product/${firstItem.id}`,
      },
      { name: "Checkout" },
    ]
  : [
      { name: "Home", path: "/" },
      { name: "Checkout" },
    ];
 
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "", 
    city: "",
    address: "",    
    paymentMethod: "COD"
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!checkoutItems || checkoutItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    const formattedCartItems = checkoutItems.map((item) => ({
      productId: item.id, 
      quantity: item.quantity
    }));
    const orderPayload = {
      fullName: formData.fullName,
      address: formData.address,
      city: formData.city,
      paymentMethod: formData.paymentMethod,
      phoneNumber: formData.phoneNumber,
      cartItems: formattedCartItems
    };
    
    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch("http://localhost:5012/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        const data = await response.json();
        alert(` Order placed successfully! Your Scriblia Order ID is: # ${data.orderId}`);
        
        if (!buyNowItem && typeof clearCart === "function") {
          clearCart(); 
        } 
        
      } else {
        const errorMessage = await response.text();
        alert(` Failed to complete purchase: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network interface error:", error);
      alert("Could not connect to server. Please check if your .NET backend app is running.");
    } finally {
      setLoading(false);
    }
  };

  const getCheckoutTotal = () => {

    return checkoutItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  };

  return (
    
    <div 
      
      className="bg-white p-4 sm:p-2  shadow-xl transition-all duration-500 animate-fadeIn"
    >
      <Breadcrumb items={breadcrumbItems} />
      <h2 className="text-2xl font-semibold text-gray-800  ms-40 dancing-script">
        Checkout Details
      </h2>
      <form onSubmit={handlePlaceOrder} className="space-y-2 px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-gray-500 ">Full Name *</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required 
              placeholder="John Doe" 
              className="w-[470px] px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 text-sm transition-colors" 
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-gray-500">Contact Number *</label>
            <input 
              type="tel" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required 
              placeholder="03001234567" 
              className="w-[470px] px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 text-sm transition-colors" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-gray-500 ">WhatsApp Number <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input type="tel" placeholder="03001234567" className="w-[470px] px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 text-sm transition-colors" />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-gray-500">City *</label>
            <input 
              type="text" 
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required 
              placeholder="Lahore" 
              className="w-[470px] px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 text-sm transition-colors" 
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-gray-500">Shipping Address *</label>
            <input 
              type="text" 
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required 
              placeholder="House No, Street name, Area address" 
              className="w-[470px] px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 text-sm transition-colors" 
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-xs font-semibold text-gray-500">Apartment / Suite <span className="text-gray-400 font-normal">(Optional)</span></label>
            <input type="text" placeholder="Apartment 4B, 3rd Floor" className="w-[470px] px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-pink-500 text-sm transition-colors" />
          </div>
        </div>

        <div className="pt-3 ">
          <h3 className="text-xs font-semibold text-gray-500 mb-3">Payment Method</h3>
          <div className="bg-gray-50 py-2 px-4 rounded-xl border border-gray-200 ">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="paymentMethod" defaultChecked className="accent-pink-500 w-4 h-4" />
              <span className="text-sm font-semibold text-gray-700">Cash on Delivery (COD)</span>
            </label>
            <p className="text-xs text-gray-400 pl-7">Pay securely using cash once the parcel reaches your doorstep.</p>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <motion.button 
            whileHover={{ y: -4 }} 
            type="submit" 
            disabled={loading} 
            style={{ fontFamily: "Playfair Display" }}
             className="text-white bg-pink-500 mx-2 px-8 py-3 rounded-2xl text-sm hover:bg-pink-600  shadow-2xl " 

          >
            {loading ? "Processing..." : `Place Order — Rs ${getCheckoutTotal().toLocaleString()}`}
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutSection;




