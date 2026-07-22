import { motion } from "framer-motion";

const Main = ({ onShopNowClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3,   
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen bg-[url('/bg.png')] bg-cover bg-center flex items-center justify-center px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-[90%] md:w-[40%] max-w-4xl bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-8 flex flex-col items-center text-center gap-2"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold dancing-script"
        >
          MASTER YOUR
        </motion.h1>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold dancing-script"
        >
          CRAFT.
        </motion.h1>

        <motion.p variants={itemVariants} className="font-medium max-w-md">
          A curated collection of handpicked tools for creativity and organization.
        </motion.p>

        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShopNowClick} 
          className="mt-4 bg-pink-500 dancing-script text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors"
        >
          Shop Now
        </motion.button>
      </motion.div>
    </main>
  );
};

export default Main;