import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceSelector from './ServiceSelector';
import ServiceDetails from './ServiceDetails';
import TabButton from './TabButton';
import { individualServices, businessServices } from '../data/servicesData';
import { PhotoGallery } from './PhotoGallery';
import MobileServiceCard from './MobileServiceCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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
  const [isMobileView, setIsMobileView] = useState(false);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedService('');
  };

  // Check for mobile view on mount and resize
  React.useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);
  const currentServices = activeTab === 'individuals' ? individualServices : businessServices;
  
  React.useEffect(() => {
    if (currentServices.length > 0 && !selectedService) {
      setSelectedService(currentServices[0].id);
    }
  }, [currentServices, selectedService]);

  const selectedServiceData = currentServices.find(service => service.id === selectedService);

  return (
    <section id="services2" className="py-4 lg:py-6">
<div className="flex flex-col">
  {/* Fondo gris claro para toda la sección de servicios (excepto galería) */}
  <div className="bg-gray-50 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <h2 className="text-3xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
          Nuestros Servicios
        </h2>
        <p className="text-base sm:text-lg lg:text-lg text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
          Soluciones integrales adaptadas para satisfacer tus necesidades únicas de salud y bienestar
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 sm:mb-10 lg:mb-16 px-4">
        <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200 w-full max-w-md sm:w-auto">
          <div className="flex space-x-1" role="tablist" aria-label="Service categories">
            <TabButton
              isActive={activeTab === 'individuals'}
              onClick={() => handleTabChange('individuals')}
              label="Individuales"
              ariaControls="individuals-panel"
            />
            <TabButton
              isActive={activeTab === 'businesses'}
              onClick={() => handleTabChange('businesses')}
              label="Empresas"
              ariaControls="businesses-panel"
            />
          </div>
        </div>
      </div>

      {/* Services layout */}
      {isMobileView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-12 lg:mb-16">
          <AnimatePresence mode="wait">
            {currentServices.map((service, index) => (
              <MobileServiceCard
                key={`${activeTab}-${service.id}`}
                service={service}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex-1 flex gap-8 lg:gap-12 mb-12 lg:mb-16">
          <AnimatePresence mode="wait">
            <motion.aside
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut'
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
      )}
    </div>
  </div>

  {/* Fondo azul claro para galería de imágenes */}
  <div className="bg-blue-50 w-full">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mt-8 lg:mt-12 bg-transparent">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-6 lg:mb-8">
          Nuestro trabajo en imágenes
        </h3>
        <div className="max-w-6xl mx-auto">
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
  </div>
</div>
    </section>
  );
};

export default Services;
