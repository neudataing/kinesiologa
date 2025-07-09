import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceSelector from './ServiceSelector';
import ServiceDetails from './ServiceDetails';
import TabButton from './TabButton';
import { individualServices, businessServices } from '../data/servicesData';

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

        {/* Call to Action */}
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
    </section>
  );
};

export default Services;


import React from 'react';
import {
  Monitor, MapPin, Zap, Heart, Users, Clock,
  AlignVerticalJustifyStart,
  StretchVertical as ErgonomiaIcon,
} from 'lucide-react';
import { PhotoGallery } from './PhotoGallery';
import { Camera, Sparkles } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

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


const Services: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Servicios <span className="text-brand-600">profesionales</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tratamientos kinesiológicos personalizados. Atención presencial y virtual.
            </p>
          </div>

          {/* Service Categories */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <AlignVerticalJustifyStart className="h-12 w-12 text-brand-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">RPG (Reeducación Postural Global)</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Sesiones personalizadas de terapia manual que brindan diagnóstico y tratamiento, con el objetivo de mejorar la postura y aliviar la sintomatologia que ésta puede ocasionar.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <ErgonomiaIcon className="h-12 w-12 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">ERGONOMÍA OCUPACIONAL</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Análisis de puestos de trabajo, con el fin de evaluar la presencia de factores de riesgo disergonomicos, determinar cuál es el nivel de exposición a los mismos y brindar las recomendaciones personalizadas para disminuir el impacto.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Heart className="h-12 w-12 text-brand-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">TRATAMIENTOS HÍBRIDOS</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Es la posibilidad de combinar presencialidad y virtualidad para poder dar continuidad y adherencia a las propuestas terapéuticas, incluso desde la comodidad del hogar.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Zap className="h-12 w-12 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">ASESORAMIENTO EMPRESARIAL</h3>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Serie de charlas y formaciones tanto para empleados como empleadores, con el objetivo de brindar herramientas para una correcta higiene postural. Como así también brindar planes estratégicos para mejorar el bienestar y la productividad, disminuir la tasa de ausentismo y reducir las dolencias físicas.
              </p>
            </div>
          
          </div>

          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Tipos de sesiones
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Monitor className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Sesiones virtuales</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Consultas en línea desde la comodidad de tu hogar. Ideal para evaluaciones posturales, orientación sobre ejercicios y seguimiento.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5 text-brand-600" />
                    <span className="text-sm text-gray-600">45-60 minutos</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-5 w-5 text-brand-600" />
                    <span className="text-sm text-gray-600">1-a-1</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Sesiones presenciales</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Sesiones de tratamiento en un entorno clínico profesional. Ideal para evaluaciones integrales y técnicas de terapia manual.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">60-90 minutos</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">1-a-1</span>
                  </div>
                </div>
              </div>
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
      </div>
      </div>
    </section>
  );
};

export default Services;