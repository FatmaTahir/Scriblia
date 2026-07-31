import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const featuredIds = [36, 37, 41, 38, 26,4,32,25];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Featured = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5012/api/product")
      .then((response) => response.json())
      .then((data) => {
        const featuredProducts = featuredIds
          .map((id) => data.find((product) => product.id === id))
          .filter(Boolean);

        setProducts(featuredProducts);
      })
      .catch((error) =>
        console.error("Error loading featured products:", error)
      );
  }, []);

  return (
    <div className="bg-gray-100 py-12">
      {/* Header */}
      <motion.div
        className="text-center mb-10 pt-5"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-semibold dancing-script">
          Featured Products
        </h1>
        <p style={{ fontFamily: "Playfair Display" }} className="text-gray-500 mt-2">
          Curated picks for creative minds
        </p>
      </motion.div>

      {/* Products */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10 pt-5 mx-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            onClick={() => navigate(`/product/${product.id}`)}
            
            className="bg-white shadow-md overflow-hidden hover:shadow-2xl transition-shadow max-h-[420px] cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={product.image}
                alt={product.name}
                className="h-64 w-full object-cover cursur-pointer"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.4 }}
              />

              {product.tag && (
                <motion.span
                initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
                style={{ fontFamily: "Playfair Display" }}
                  className={`absolute top-2 right-2 text-xs px-2 py-1 text-white ${product.tag === "SALE"
                      ? "bg-red-500"
                      : product.tag === "NEW"
                        ? "bg-pink-500"
                        : "bg-green-500"
                    }`}
                >
                  {product.tag}
                </motion.span>
              )}
            </div>

            <div className="p-3">
              <h2 className="text-lg font-semibold text-center dancing-script">
                {product.name}
              </h2>

              <p style={{ fontFamily: "Playfair Display" }}
              className="text-gray-700 text-center mt-2">
                Rs. {product.price}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Featured;