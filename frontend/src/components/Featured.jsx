import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Rainbow Colored Pencil Set", price: 24.99, rating: 4.5, image: "./categories/pencils.png", tag: "NEW" },
  { id: 2, name: "Vibrant Notebook Collection", price: 32.99, rating: 5, image: "./categories/Notebook.png", tag: "SALE" },
  { id: 3, name: "Modern Desk Organizer Kit", price: 45.99, rating: 4, image: "./categories/DeskOrganizers.png", tag: "SALE" },
  { id: 4, name: "Pastel Highlighters", price: 28.99, rating: 5, image: "./categories/Highlighters.png", tag: "BESTSELLER" },
  { id: 5, name: "Luxury Pen Set", price: 28.99, rating: 5, image: "./categories/Pens.png", tag: "BESTSELLER" },
  { id: 6, name: "Eco-Friendly Planners", price: 28.99, rating: 5, image: "./categories/Planners.png", tag: "BESTSELLER" },
  { id: 7, name: "Washi-Tape Pack", price: 28.99, rating: 5, image: "./categories/Tapes.png", tag: "BESTSELLER" },
  { id: 8, name: "Premium Sticker Collection", price: 28.99, rating: 5, image: "./categories/Stickers.png", tag: "BESTSELLER" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};


const Featured = () => {
  return (
    <div className="bg-gray-100 py-12 cursor-pointer">
      {/* Header Animation */}
      <motion.div 
        className="text-center mb-10 pt-5"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl font-semibold dancing-script">Featured Products</h1>
        <p className="text-gray-500 mt-2">Curated picks for creative minds</p>
      </motion.div>

      {/* Grid with Staggered Entrance */}
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
            className="shadow-md overflow-hidden hover:shadow-2xl transition-shadow"
            whileHover={{ y: -10 }} // Lifts card up on hover
          >
            <div className="relative overflow-hidden">
              <motion.img 
                src={product.image} 
                alt={product.name} 
                className="h-64 w-full object-cover"
                whileHover={{ scale: 1.2 }} // Zooms image slightly inside the card
                transition={{ duration: 0.4 }}
              />
              {product.tag && (
                <motion.span
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className={`absolute top-2 right-2 text-xs px-2 py-1  text-white ${
                    product.tag === "SALE" ? "bg-red-500" : product.tag === "NEW" ? "bg-pink-500" : "bg-green-500"
                  }`}
                >
                  {product.tag}
                </motion.span>
              )}
            </div>

            <div className="p-1">
              <h2 className="text-lg mb-1 font-semibold text-center dancing-script">{product.name}</h2>
              {/* <div className="text-yellow-500 text-sm mb-2 flex gap-1 ">
                {renderStars(product.rating)}
              </div> */}
              <p className="text-gray-700  text-center">Rs.{product.price}</p>
              {/* <div className="flex justify-between items-center">
                {/* <button className="text-sm underline text-gray-500 hover:text-pink-500 transition-colors">View Details</button>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600"
                >
                  Add to Cart
                </motion.button> */}
              {/* </div> */} 
            </div>
          </motion.div>
        ))}
      </motion.div>

      
    </div>
  );
};

export default Featured;