import React from 'react';
import { motion } from "framer-motion";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
const Footer = () => {
  return (
   <div className='flex flex-col bg-gray-300'>
    <div className='flex flex-row bg-gray-300 py-9 items-center justify-center gap-48'  >
     <motion.div className='flex flex-col items-start gap-1 list-none' initial={{opacity:0,y:30}} viewport={{ once: true }} transition={{ duration: 1 }}  whileInView={{opacity:1,y:0}}>
        <h1 className='text-black text-xl font-semibold dancing-script'>Customer Care</h1>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>Shipping Info</li>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>Returns</li>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>About Us</li>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>FAQ</li>
     </motion.div>
     
     <motion.div className='flex flex-col items-start gap-1 list-none' initial={{opacity:0,y:30}} viewport={{ once: true }} transition={{ duration: 1 }}  whileInView={{opacity:1,y:0}}>
        <h1 className='text-black text-xl font-semibold dancing-script'>Discover</h1>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>Notepads</li>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>Organizing Essentials</li>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>Art & Color</li>
        <li className='text-gray-600 text-sm hover:cursor-pointer hover:underline'>Sticky Items</li>
     </motion.div>
     <div className='flex flex-col items-start gap-3 mb-16 list-none'>
        <h1 className='text-black text-xl font-semibold dancing-script'>Follow Us</h1>
        <div className='flex flex-row gap-3'>
        <motion.li className='bg-red-400 rounded-full w-8 h-8 text-white text-lg font-semibold flex items-center justify-center hover:cursor-pointer'
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{scale:1.3 }} 
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        ><FaInstagram/></motion.li>
        <motion.li className='bg-black rounded-full w-8 h-8 text-white text-lg font-semibold flex items-center justify-center hover:cursor-pointer'
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{scale:1.3 }} 
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        ><IoLogoTiktok/></motion.li>
        <motion.li className='bg-green-400 rounded-full w-8 h-8 text-white text-lg font-semibold flex items-center justify-center hover:cursor-pointer'
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{scale:1.3 }} 
        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
        ><FaWhatsapp/></motion.li>
        </div>
     </div>
    </div>
    <div className='flex text-gray-600 justify-center items-center  bg-gray-300 p-0 mb-1 dancing-script'>
      <p>&copy; 2026 SCRIBLIA. All rights reserved.</p>
    </div>
    </div>
  )
}

export default Footer