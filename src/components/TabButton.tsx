import React from 'react';
import { motion } from 'framer-motion';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  ariaControls: string;
}

const TabButton: React.FC<TabButtonProps> = ({ isActive, onClick, label, ariaControls }) => {
  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-controls={ariaControls}
      id={`${label.toLowerCase()}-tab`}
      onClick={onClick}
      className={`
        relative px-8 py-3 font-semibold text-sm rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isActive 
          ? 'text-white shadow-md' 
          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
        }
      `}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-blue-600 rounded-md"
          style={{ backgroundColor: '#007bff' }}
          transition={{ 
            type: "spring", 
            stiffness: 500, 
            damping: 30 
          }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

export default TabButton;