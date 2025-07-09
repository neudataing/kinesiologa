import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../data/servicesData';
import { ArrowRight } from 'lucide-react';

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
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 group cursor-pointer"
    >
      {/* Header */}
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
      
      {/* Description */}
      <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-5 line-clamp-3">
        {service.description}
      </p>
      
      {/* Action Button */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md p-2 -m-2 min-h-[44px]"
        >
          <span className="mr-2">Learn More</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.button>
        
        {/* Visual indicator */}
        <div 
          className="w-3 h-3 rounded-full opacity-60"
          style={{ backgroundColor: service.color }}
        />
      </div>
    </motion.div>
  );
};

export default MobileServiceCard;