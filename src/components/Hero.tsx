import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [logoVersion, setLogoVersion] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = document.getElementById('home')?.offsetHeight || 0;
      const scrollPercentage = Math.min(scrollPosition / (heroHeight * 0.7), 1);
      
      // Cambiar logo al pasar el 50% del Hero
      setLogoVersion(scrollPercentage > 0.5 ? 'light' : 'dark');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen py-8 bg-gradient-to-b from-brand-500 via-brand-200 to-white flex items-center"
    >
      <div className="container mx-auto px-8 sm:px-10 lg:px-14 py-20 max-w-10xl">
        <div 
          ref={ref}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-12 items-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-7 lg:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-6.5xl font-bold text-gray-900 leading-tight max-w-xl">
              Transformá tu salud con <span className="text-brand-500 inline">kinesiología de calidad</span>
            </h1>

            <p className="text-lg lg:text-2xl text-gray-700 leading-relaxed max-w-2xl">
              Corrección postural profesional y tratamientos diseñados para ayudarte a moverte mejor, sentirte más fuerte y vivir sin dolor.
            </p>
          </div>

          <div className="relative flex justify-center mt-8 lg:mt-0">
            <div className="relative transition-all duration-500">
              <img
                src={logoVersion === 'dark' 
                  ? "/img/Logo-ES-Invertido.png" 
                  : "/img/Logo-ES.png"}
                alt="Logo"
                className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg h-auto object-contain transition-opacity duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;