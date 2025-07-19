import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../data/servicesData';

interface MobileServiceCardProps {
  service: Service;
  index: number;
}

const MobileServiceCard: React.FC<MobileServiceCardProps> = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group"
    >

      <div className="flex items-start mb-4">
        <div 
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200 flex-shrink-0"
          style={{ backgroundColor: `${service.color}20` }}
        >
          <Icon 
            className="w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-200" 
            style={{ color: service.color }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-2 leading-tight">
            {service.title}
          </h3>
        </div>
      </div>
      
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
        {service.description}
      </p>
    </motion.div>
  );
};

export default MobileServiceCard;