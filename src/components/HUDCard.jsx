import React from 'react';
import { motion } from 'framer-motion';

const HUDCard = ({ title, children, className = "", delay = 0, onClick, isSelected = false }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ 
      opacity: 1, 
      scale: isSelected ? 0.98 : 1, 
      borderColor: isSelected ? '#1793d1' : 'rgb(39 39 42)'
    }}
    transition={{ duration: isSelected ? 0.1 : 0.5, delay: isSelected ? 0 : delay }}
    onClick={onClick}
    className={`relative bg-black border border-zinc-800 p-6 flex flex-col ${className} group hover:border-zinc-500 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/50" />
    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/50" />
    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />

    <div className="flex justify-between items-center mb-4 border-b border-zinc-900 pb-2">
      <h3 className={`text-xs font-mono uppercase tracking-[0.2em] transition-colors ${isSelected ? 'text-[#1793d1]' : 'text-zinc-400 group-hover:text-white'}`}>{title}</h3>
      <div className="flex gap-1">
        <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#1793d1]' : 'bg-zinc-800 group-hover:bg-[#1793d1]'}`} />
        <div className={`w-1 h-1 rounded-full ${isSelected ? 'bg-[#1793d1]' : 'bg-zinc-800 group-hover:bg-[#1793d1]'} delay-75`} />
      </div>
    </div>
    <div className="flex-1 font-mono text-sm text-zinc-300 pointer-events-none md:pointer-events-auto">
      {children}
    </div>
  </motion.div>
);

export default HUDCard;