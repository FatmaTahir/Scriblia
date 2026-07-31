import React from "react";
import { motion } from "framer-motion";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot, FaRegEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col bg-gray-300">
      <div className="flex flex-row bg-gray-300 py-9 items-start justify-center gap-16">
        {/* Column 1 */}
        <motion.div
          className="flex flex-col items-start gap-2 max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: false}}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Logo -> Home */}
          <Link to="/">
            <h1 className="text-black text-2xl font-bold tracking-wide dancing-script hover:text-gray-700 transition">
              SCRIBLIA
            </h1>
          </Link>

          <p className="text-gray-600 text-sm leading-relaxed"
          style={{ fontFamily: "Playfair Display" }}>
            A curated collection of handpicked tools for creativity, planning,
            and organization. Designed to bring color and aesthetic joy to your
            daily workspace.
          </p>

          <div className="flex flex-col gap-1 text-gray-600 text-xs mt-3">
            <div className="flex flex-row gap-1">
              <FaLocationDot className="mt-[3px]" />
              <p className="font-medium text-gray-700"
              style={{ fontFamily: "Playfair Display" }}>
                123 Creative Lane, Art Town, ST 12345
              </p>
            </div>

            <div className="flex flex-row gap-[6px]">
              <FaRegEnvelope className="mt-[3px]" />
              <p className="font-medium text-gray-700"
              style={{ fontFamily: "Playfair Display" }}>
                support@scriblia.com
              </p>
            </div>
          </div>
        </motion.div>

        {/* Column 2 */}
        <motion.div
          className="flex flex-col items-start gap-1"
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: false }}
          transition={{ duration: 1 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-black text-xl font-semibold dancing-script">
            Discover
          </h1>

          <Link
            to="/journals"
            className="text-gray-600 text-sm hover:text-gray-900"
            style={{ fontFamily: "Playfair Display" }}
          >
            Journals
          </Link>

          <Link
            to="/organizing"
            className="text-gray-600 text-sm hover:text-gray-900"
            style={{ fontFamily: "Playfair Display" }}
          >
            Organizers
          </Link>

          <Link
            to="/artsupplies"
            className="text-gray-600 text-sm hover:text-gray-900"
            style={{ fontFamily: "Playfair Display" }}
          >
            Art &amp; Color
          </Link>

          <Link
            to="/pens"
            className="text-gray-600 text-sm hover:text-gray-900"
            style={{ fontFamily: "Playfair Display" }}
          >
            Writing Essentials
          </Link>

          <Link
            to="/stickyitems"
            className="text-gray-600 text-sm hover:text-gray-900"
            style={{ fontFamily: "Playfair Display" }}
          >
            Sticky Items
          </Link>
        </motion.div>

        {/* Column 3 */}
        <div className="flex flex-col items-start gap-3 mb-16">
          <h1 className="text-black text-xl font-semibold dancing-script">
            Follow Us
          </h1>

          <div className="flex flex-row gap-3">
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bg-red-400 rounded-full w-8 h-8 text-white text-lg flex items-center justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.3 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            >
              <FaInstagram />
            </motion.a>

            <motion.a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="bg-black rounded-full w-8 h-8 text-white text-lg flex items-center justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.3 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
            >
              <IoLogoTiktok />
            </motion.a>

            <motion.a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="bg-green-400 rounded-full w-8 h-8 text-white text-lg flex items-center justify-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              whileHover={{ scale: 1.3 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center bg-gray-300 mb-1 dancing-script text-gray-600">
        <p style={{ fontFamily: "Playfair Display" }}>&copy; 2026 SCRIBLIA. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;