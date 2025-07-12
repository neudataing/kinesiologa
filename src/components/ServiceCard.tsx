import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: typeof DivideIcon;
  color: string;
}

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const { title, description, icon: Icon, color } = service;

  return (
    <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 group"
    >
      <div className="flex items-center mb-4">
        <div 
          className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200`}
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon 
            className="w-6 h-6 transition-colors duration-200" 
            style={{ color: color }}
          />
        </div>
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
          {title}
        </h3>
      </div>
      
      <p className="text-gray-600 leading-relaxed line-clamp-3">
        {description}
      </p>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
        >
          Learn More →
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;