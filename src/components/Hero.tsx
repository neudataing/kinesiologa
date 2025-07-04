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
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div 
          ref={ref}
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-8">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transformá tu salud con 
              <span className="text-emerald-600 block">kinesiología de calidad</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Corrección postural profesional y tratamientos diseñados para ayudarte a mover mejor, sentir más fuerte y vivir sin dolor. Disponible tanto virtual como presencialmente.
            </p>
        
           
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/img/Logo-ES.png"
                alt="Logo"
                className="w-[500] h-[500] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;