import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-8 px-4"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Branding */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">BuyBuddy</h2>
          <p className="text-sm">Your ultimate shopping companion</p>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 mb-4 md:mb-0">
          <li>
            <Link
              to="/aboutus"
              className="hover:text-gray-300 transition-colors duration-300"
            >
          About Us
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-300 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
          <li>
           
          </li>
        </ul>

        {/* Social Media Icons */}
        <div className="flex space-x-4 text-2xl">
          <motion.a
            href="https://facebook.com"
            whileHover={{ scale: 1.2 }}
            className="hover:text-blue-400 transition duration-300"
          >
            <FaFacebook />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            whileHover={{ scale: 1.2 }}
            className="hover:text-blue-300 transition duration-300"
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            whileHover={{ scale: 1.2 }}
            className="hover:text-pink-400 transition duration-300"
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            whileHover={{ scale: 1.2 }}
            className="hover:text-blue-500 transition duration-300"
          >
            <FaLinkedin />
          </motion.a>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center text-sm">
        © {new Date().getFullYear()} BuyBuddy. All rights reserved.
      </div>
    </motion.footer>
  );
};
