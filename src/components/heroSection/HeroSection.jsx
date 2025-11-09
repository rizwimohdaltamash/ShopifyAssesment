import React from "react";
import { motion } from "framer-motion";
import { FiShoppingCart } from "react-icons/fi"; // <-- cart icon
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[45vh] md:h-[55vh] lg:h-[65vh] bg-gradient-to-br from-green-100 via-emerald-300 to-green-600 flex flex-col justify-center items-center text-white relative overflow-hidden">
      
      {/* Logo + Cart */}
      <motion.div
        className="flex items-center gap-3 mb-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <FiShoppingCart className="text-green-900 text-5xl md:text-6xl drop-shadow-lg" />
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-green-900 drop-shadow-xl tracking-tight">
          Shopify
        </h1>
      </motion.div>

      {/* Tagline */}
      <motion.p
        className="mt-3 text-sm md:text-lg lg:text-xl text-center text-green-50 w-[85%] md:w-[60%] lg:w-[45%] font-medium"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
      >
        Your one-stop destination for top deals, trendy collections, and eco-friendly shopping experiences.
      </motion.p>

      {/* CTA Buttons */}
      <div className="flex gap-4 mt-6">
        <motion.button
          className="px-6 py-3 bg-white text-green-800 font-semibold rounded-full shadow-md hover:bg-green-50 hover:scale-105 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Start Shopping
        </motion.button>

        <motion.button
          className="px-6 py-3 bg-green-800 text-white font-semibold rounded-full shadow-md hover:bg-green-900 hover:scale-105 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/allproduct")}
        >
          View Offers
        </motion.button>
      </div>

      {/* Decorative Glow Circles */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-green-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
    </div>
  );
};

export default HeroSection;
