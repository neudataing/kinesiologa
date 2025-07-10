import React from 'react';
import { ArrowRight, PlayCircle, Star } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div 
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-8 lg:space-y-10">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
              Transformá tu salud con <span className="text-brand-300 inline">kinesiología de calidad</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-900 leading-relaxed text-justify max-w-2xl">
              Corrección postural profesional y tratamientos diseñados para ayudarte a mover mejor, sentir más fuerte y vivir sin dolor. Disponible tanto virtual como presencialmente.
            </p>
        
           
          </div>
          
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="/img/Logo-ES.png"
                alt="Logo"
                className="w-full max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;