import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    url: 'img/Eli1.jpg',
    alt: 'Imagen 1',
    title: 'Imagen 1'
  },
  {
    id: '2',
    url: 'img/Eli2.jpg',
    alt: 'Imagen 2',
    title: 'Imagen 2'
  },
  {
    id: '3',
    url: 'img/Eli3.jpg',
    alt: 'Imagen 3',
    title: 'Imagen 3'
  },
  {
    id: '4',
    url: 'img/Eli4.jpg',
    alt: 'Imagen 4',
    title: 'Imagen 4'
  },
  {
    id: '5',
    url: 'img/Eli5.jpg',
    alt: 'Imagen 5',
    title: 'Imagen 5'
  }
];

type TabType = 'individuals' | 'businesses';

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('individuals');
  const [isMobileView, setIsMobileView] = useState(false);


  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  // Check for mobile view on mount and resize
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 1024);
    };

    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  const currentServices = activeTab === 'individuals' ? individualServices : businessServices;

  return (
    <section id="services2" className="py-4 lg:py-6">
      <div className="flex flex-col">
        
        <div className="bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="pt-12 text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Mis <span className="text-brand-300">servicios</span>
              </h2>
              <p className="text-base sm:text-lg lg:text-lg text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
                El equilibrio y el bienestar postural son los pilares sobre los que construyo la calidad del servicio que ofrezco, brindando soluciones integrales adaptadas a tus necesidades.
              </p>
            </div>


            <div className="flex justify-center mb-8 sm:mb-10 lg:mb-16 px-4">
              <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-200 w-full max-w-md sm:w-auto">
                <div className="flex space-x-1" role="tablist" aria-label="Service categories">
                  <TabButton
                    isActive={activeTab === 'individuals'}
                    onClick={() => handleTabChange('individuals')}
                    label="Individuos"
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

           
            <div className="mb-12 lg:mb-16">
              <AnimatePresence mode="wait">
                {isMobileView ? (
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {currentServices.map((service, index) => (
                      <MobileServiceCard 
                        key={service.id} 
                        service={service} 
                        index={index} 
                      />
                    ))}
                  </motion.div>
                ) : (
               
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
                  >
                    {currentServices.map((service) => (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.03 }}
                        transition={{
                          duration: 0.3,
                          ease: 'easeInOut'
                        }}
                        className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <ServiceDetails service={service} />
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

  
        <div className="bg-white w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0">
            <div className="mt-8 lg:mt-12 bg-transparent">
            <h2 className="text-center text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Mi trabajo en <span className="text-brand-300">imágenes</span>
            </h2>
              <div className="max-w-5xl mx-auto">
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