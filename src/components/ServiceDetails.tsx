import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../data/servicesData';

interface ServiceDetailsProps {
  service: Service;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-fit hidden lg:block"
    >
      {/* Header */}
      <div 
        className="px-6 lg:px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100"
        style={{ 
          background: `linear-gradient(135deg, ${service.color}08 0%, ${service.color}15 100%)`
        }}
      >
        <div className="flex items-center mb-4">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center mr-6 shadow-lg"
            style={{ backgroundColor: `${service.color}20` }}
          >
            <Icon 
              className="w-8 h-8" 
              style={{ color: service.color }}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {service.title}
            </h2>

          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          {service.description}
        </p>
      </div>

    </motion.div>
  );
};

export default ServiceDetails;