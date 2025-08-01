import React from 'react';
import { useInView } from 'react-intersection-observer';

const Hero: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="home"
      className="min-h-screen  py-8 bg-gradient-to-b from-brand-600 via-brand-200 to-white flex items-center"
    >
      <div className="container mx-auto px-8 sm:px-10 lg:px-14 py-20 max-w-10xl">
        <div 
          ref={ref}
          className={`grid lg:grid-cols-2 gap-10 lg:gap-12 items-center transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="space-y-7 lg:space-y-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-6.5xl font-bold text-gray-100 leading-tight max-w-xl">
              Transformá tu salud con <span className="text-brand-500 inline">kinesiología de calidad</span>
            </h1>

            <p className="text-lg lg:text-2xl text-gray-800 leading-relaxed max-w-2xl">
              Reeducación postural y tratamientos funcionales para moverte mejor, sentirte más fuerte, aliviar el dolor y prevenir molestias futuras.
            </p>
          </div>

          <div className="relative flex justify-center mt-8 lg:mt-0">
            <div className="relative transition-all duration-500">
              <img
                src={"/img/Logo-ES.png"}
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