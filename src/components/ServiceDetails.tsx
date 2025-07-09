import React from 'react';
import { motion } from 'framer-motion';
import { Service } from '../data/servicesData';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';

interface ServiceDetailsProps {
  service: Service;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service }) => {
  const Icon = service.icon;

  // Mock features for demonstration
  const features = [
    'Professional consultation and planning',
    '24/7 customer support and assistance',
    'Competitive rates and flexible terms',
    'Secure and reliable service delivery',
    'Personalized solutions for your needs'
  ];

  const benefits = [
    'Save time with streamlined processes',
    'Expert guidance from industry professionals',
    'Comprehensive coverage and protection',
    'Scalable solutions that grow with you'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden h-fit"
    >
      {/* Header */}
      <div 
        className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100"
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
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>Premium Service</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Key Features */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            Key Features
          </h3>
          <div className="grid gap-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center text-gray-700"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="w-5 h-5 text-yellow-500 mr-2" />
            Benefits
          </h3>
          <div className="grid gap-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (index + features.length) * 0.1, duration: 0.3 }}
                className="flex items-center text-gray-700"
              >
                <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceDetails;