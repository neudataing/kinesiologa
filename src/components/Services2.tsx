import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceSelector from './ServiceSelector';
import ServiceDetails from './ServiceDetails';
import TabButton from './TabButton';
import { individualServices, businessServices } from '../data/servicesData';

const samplePhotos = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Mountain landscape with snow-capped peaks',
    title: 'Majestic Mountains'
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Ocean waves crashing on rocky shore',
    title: 'Ocean Waves'
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/1440727/pexels-photo-1440727.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Forest path with sunlight filtering through trees',
    title: 'Forest Path'
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Desert sand dunes at sunset',
    title: 'Desert Sunset'
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'City skyline with reflection in water',
    title: 'City Lights'
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Lavender field in bloom',
    title: 'Lavender Dreams'
  }
];


type TabType = 'individuals' | 'businesses';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('individuals');
  const [selectedService, setSelectedService] = useState<string>('');

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedService('');
  };

  const currentServices = activeTab === 'individuals' ? individualServices : businessServices;
  
  React.useEffect(() => {
    if (currentServices.length > 0 && !selectedService) {
      setSelectedService(currentServices[0].id);
    }
  }, [currentServices, selectedService]);

  const selectedServiceData = currentServices.find(service => service.id === selectedService);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions tailored to meet your unique needs
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200">
            <div className="flex space-x-1" role="tablist" aria-label="Service categories">
              <TabButton
                isActive={activeTab === 'individuals'}
                onClick={() => handleTabChange('individuals')}
                label="Individuals"
                ariaControls="individuals-panel"
              />
              <TabButton
                isActive={activeTab === 'businesses'}
                onClick={() => handleTabChange('businesses')}
                label="Businesses"
                ariaControls="businesses-panel"
              />
            </div>
          </div>
        </div>

        {/* Service Selector Layout */}
        <div className="flex-1 flex gap-8 lg:gap-12">
          <AnimatePresence mode="wait">
            <motion.aside
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="w-full lg:w-80 xl:w-96"
            >
              <ServiceSelector
                services={currentServices}
                selectedService={selectedService}
                onServiceSelect={setSelectedService}
                tabType={activeTab}
              />
            </motion.aside>
          </AnimatePresence>
          
          {/* Service Details */}
          <main className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {selectedServiceData && (
                <ServiceDetails
                  key={selectedService}
                  service={selectedServiceData}
                />
              )}
            </AnimatePresence>
          </main>
        </div>
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact us today to discuss how we can help you achieve your goals
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Get in Touch
            </button>
          </motion.div>
        </div>
      </div>
      <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nuestro trabajo en imágenes
          </h3>
           <div className="max-w-6xl mx-auto">
            <div className="mb-12">
            <PhotoGallery 
              photos={samplePhotos}
              autoPlay={true}
              autoPlayInterval={8000}
              showDots={true}
              showArrows={true}
            />
            </div>
          </div>
        </div>
    </section>
  );
};

export default Services;