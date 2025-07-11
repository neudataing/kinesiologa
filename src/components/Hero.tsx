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
        <section id="home" className="min-h-screen flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-8 lg:space-y-10">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight max-w-xl">
              Transformá tu salud con <span className="text-brand-300 inline">kinesiología de calidad</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl">
              Corrección postural profesional y tratamientos diseñados para ayudarte a mover mejor, sentir más fuerte y vivir sin dolor. Disponible tanto virtual como presencialmente.
            </p>
          </div>

          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              <img
                src="/img/Logo-ES.png"
                alt="Logo"
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;