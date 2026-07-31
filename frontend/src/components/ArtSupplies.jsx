import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const ArtSupplies = () => {
  const [arts, setArts] = useState([]); 
  const navigate = useNavigate();
   const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5012/api/Product/category/artSupplies") 
      .then(res => {
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Art Supplies Data received successfully:", data);
        setArts(data);
      })
      .catch(err => console.log("Fetch error:", err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12 flex flex-col">
      <motion.div
        className="text-center mb-10 pt-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-semibold text-gray-800 dancing-script mt-10">Art Supplies</h1>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 pt-5 mx-20 flex-grow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {arts.map((product) => (
          <motion.div
                      key={product.id}
                      variants={itemVariants}
                      className="bg-white shadow-md overflow-hidden hover:shadow-2xl transition-shadow max-h-[420px]"
                      whileHover={{ y: -10 }}
                    >
                      <div className="relative overflow-hidden ">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="h-64 w-full object-cover cursor-pointer"
                          whileHover={{ scale: 1.2}}
                          transition={{ duration: 0.4 }}
                          onError={(e) => {
                            e.target.src = "https://placeholder.co/300x200?text=No+Image+Found";
                          }}
                          onClick={()=>{ console.log("Image clicked");
                            navigate(`/product/${product.id}`)}}
                        />
          
                        {product.tag && (
                          <span
                            className={`absolute top-2 right-2 text-xs px-2 py-1 text-white ${
                              product.tag === "SALE"
                                ? "bg-red-500"
                                : product.tag === "NEW"
                                ? "bg-pink-500"
                                : "bg-green-500"
                            }`}
                          >
                            {product.tag}
                          </span>
                        )}
                      </div>
          
                      <div className="p-1">
                        <h2 className=" text-lg mb-1 font-semibold text-center dancing-script ">{product.name}</h2>
          
                        {/* <div className="text-yellow-500 text-sm mb-2 flex gap-1">
                          {renderStars(product.rating)}
                        </div> */}
          
                       
          
                        <div className="flex justify-between items-center px-3">
                          {/* <Link to={`/product/${product.id}`}
                          className="text-sm underline hover:text-pink-500 transition-colors">
                            View Details
                          </Link> */}
                           <p className=" text-gray-700 text-center">Rs.{product.price}</p>
          
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={()=>addToCart(product)}
                            className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600"
                          >
                            Add to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ArtSupplies;