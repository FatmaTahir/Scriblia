import { motion } from "framer-motion";
import { LuPen, LuScissors } from "react-icons/lu";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { IoMdColorPalette } from "react-icons/io";
import { LiaStickyNoteSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const categories = [
  { name: "Pens", item: LuPen, color: "bg-pink-500", path: "/pens" },
  { name: "Journals", item: HiOutlineBookOpen, color: "bg-cyan-500", path: "/journals" },
  { name: "Organizing", item: LuScissors, color: "bg-orange-500", path: "/organizing" },
  { name: "Art Supplies", item: IoMdColorPalette, color: "bg-green-500", path: "/artSupplies" },
  { name: "Sticky Items", item: LiaStickyNoteSolid, color: "bg-purple-500", path: "/stickyItems" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
};

const Category = ({ sectionRef }) => {
  return (
    <motion.div
      ref={sectionRef} 
      className="bg-white py-24"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-4xl text-center mb-12 dancing-script font-semibold"
      >
        Shop By Category
      </motion.h1>

      {/* Categories */}
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true}}
          className="flex justify-center gap-10 px-10 flex-wrap"
        >
          {categories.map((cat, index) => {
            const Icon = cat.item;

            return (
              <Link to={cat.path} key={index}>
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col items-center cursor-pointer group"
                  whileHover={{ y: -5 }}
                >
                  {/* Icon Circle */}
                  <motion.div
                    className={`w-24 h-24 ${cat.color} rounded-full flex items-center justify-center shadow-md transition-shadow group-hover:shadow-xl`}
                    whileHover={{
                      scale: 1.15,
                      rotate: 5,
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="text-white text-4xl" />
                  </motion.div>

                  {/* Text */}
                  <motion.p 
                  style={{ fontFamily: "Playfair Display" }}
                  className="mt-4 text-sm font-medium text-gray-700 transition-colors group-hover:text-black">
                    {cat.name}
                  </motion.p>
                </motion.div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Category;