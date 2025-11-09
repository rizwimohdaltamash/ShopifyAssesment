import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="text-gray-200 body-font bg-gradient-to-r from-green-900 via-emerald-900 to-gray-900 shadow-inner">
      {/* main container */}
      <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col">
        
        {/* Brand name */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-green-300 hover:text-green-400 transition"
        >
          Shopify
        </motion.span>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-500 sm:py-2 sm:mt-0 mt-4"
        >
          © 2025 Shopify —
          <Link
            to="/"
            className="text-green-400 ml-1 hover:text-green-300 transition"
            rel="noopener noreferrer"
            target="_blank"
          >
            @shopify
          </Link>
        </motion.p>

        {/* Seller Form Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="sm:ml-auto mt-4 sm:mt-0"
        >
          <button
            onClick={() => navigate("/sellerform")}
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-500 hover:from-emerald-500 hover:to-green-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Seller Form
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

