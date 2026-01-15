import React from 'react';
import { motion } from 'framer-motion';

const WireframeGlobe = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center opacity-80 overflow-hidden pointer-events-none">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-64 h-64 md:w-96 md:h-96 text-white stroke-current stroke-[0.5]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="50" cy="50" r="48" fill="none" className="opacity-50" />
        <ellipse cx="50" cy="50" rx="48" ry="15" fill="none" />
        <ellipse cx="50" cy="50" rx="48" ry="30" fill="none" />
        <path d="M50 2 A 48 48 0 0 1 50 98" fill="none" strokeDasharray="4 4" />
        <path d="M2 50 A 48 48 0 0 1 98 50" fill="none" strokeDasharray="4 4" />
      </motion.svg>
    </div>
  );
};

export default WireframeGlobe;