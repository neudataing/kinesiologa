import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../data/servicesData';

interface ServiceSelectorProps {
  services: Service[];
  selectedService: string;
  onServiceSelect: (serviceId: string) => void;
  tabType: 'individuals' | 'businesses';
}

const ServiceSelector: React.FC<ServiceSelectorProps> = ({
  services,
  selectedService,
  onServiceSelect,
  tabType
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hidden lg:block">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 capitalize">
          {tabType} Services
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Select a service to learn more
        </p>
      </div>

      {/* Service List */}
      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200" />
        
        <nav className="py-2" role="navigation" aria-label="Service selection">
          {services.map((service, index) => {
            const isSelected = selectedService === service.id;
            const Icon = service.icon;
            
            return (
              <motion.button
                key={service.id}
                onClick={() => onServiceSelect(service.id)}
                className={`
                  relative w-full text-left px-6 py-4 transition-all duration-200 
                  hover:bg-gray-50 focus:outline-none focus:bg-gray-50
                  ${isSelected ? 'bg-blue-50 border-r-2 border-blue-500' : ''}
                `}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                aria-label={`Select ${service.title} service`}
              >
                {/* Connection Dot */}
                <div className={`
                  absolute left-5 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-200
                  ${isSelected 
                    ? 'bg-blue-500 border-blue-500 shadow-lg' 
                    : 'bg-white border-gray-300 group-hover:border-blue-400'
                  }
                `} />
                
                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    layoutId="selectedIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30 
                    }}
                  />
                )}

                <div className="flex items-center ml-6">
                  {/* Icon */}
                  <div 
                    className={`
                      w-10 h-10 rounded-lg flex items-center justify-center mr-4 transition-all duration-200
                      ${isSelected 
                        ? 'shadow-md transform scale-110' 
                        : 'group-hover:scale-105'
                      }
                    `}
                    style={{ 
                      backgroundColor: isSelected ? `${service.color}20` : `${service.color}10`
                    }}
                  >
                    <Icon 
                      className={`w-5 h-5 transition-all duration-200`}
                      style={{ 
                        color: isSelected ? service.color : `${service.color}80`
                      }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className={`
                      font-semibold text-sm transition-colors duration-200
                      ${isSelected ? 'text-blue-900' : 'text-gray-900'}
                    `}>
                      {service.title}
                    </h4>
                    <p className={`
                      text-xs mt-1 line-clamp-2 transition-colors duration-200
                      ${isSelected ? 'text-blue-700' : 'text-gray-600'}
                    `}>
                      {service.description}
                    </p>
                  </div>

                  {/* Arrow Indicator */}
                  <motion.div
                    className={`
                      ml-2 transition-all duration-200
                      ${isSelected ? 'text-blue-500' : 'text-gray-400'}
                    `}
                    animate={{ 
                      x: isSelected ? 4 : 0,
                      opacity: isSelected ? 1 : 0.6
                    }}
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default ServiceSelector;