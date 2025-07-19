import React from 'react';
import { Award, BookOpen, Users, Target } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-4 lg:py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Conocé a <span className="text-brand-300">Eliana</span>
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Soy Eliana Schenkel (MPRN 1002), kinesióloga especializada en reeducación postural (RPG) y ergonomía ocupacional. Trabajo en sesiones individuales y también asesoro a empresas en el cuidado postural de sus equipos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="space-y-8 lg:space-y-10">
              <div className="prose prose-lg text-gray-600">
                <p className="text-base lg:text-lg leading-relaxed text-gray-600">
                  Con más de 10 años de experiencia en kinesiología y terapia del movimiento, he dedicado mi carrera a ayudar a personas a superar limitaciones físicas y alcanzar sus objetivos de bienestar. Mi enfoque combina técnicas basadas en la evidencia con atención personalizada para abordar las necesidades únicas de cada cliente.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                <div className="flex items-start space-x-3">
                  <Award className="h-8 w-8 text-brand-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg">Profesional certificada</h3>
                    <p className="text-sm lg:text-base text-gray-600">Licenciada en kinesiología con múltiples certificaciones.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-8 w-8 text-brand-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg">Capacitación continua</h3>
                    <p className="text-sm lg:text-base text-gray-600">Actualizaciones constantes en las últimas técnicas.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-8 w-8 text-brand-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg">Centrada en el cliente</h3>
                    <p className="text-sm lg:text-base text-gray-600">Tratamientos y planes personalizados para cada individuo.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Target className="h-8 w-8 text-brand-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base lg:text-lg">Orientada a resultados</h3>
                    <p className="text-sm lg:text-base text-gray-600">Enfocada en lograr mejoras mensurables.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/img/Eliana.jpg"
                  alt="Eliana, kinesiologa profesional"
                  className="w-full max-w-md lg:max-w-lg h-[400px] lg:h-[500px] object-cover object-top"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 lg:-bottom-8 lg:-left-8 bg-brand-600 text-white p-4 lg:p-6 rounded-2xl shadow-xl">
                <div className="text-2xl lg:text-3xl font-bold">+10</div>
                <div className="text-xs lg:text-sm opacity-90">Años de experiencia</div>
              </div>

            {/**
              <div className="absolute -top-6 -right-6 lg:-top-6 lg:-right-6 bg-brand-600 text-white p-4 lg:p-6 bg-white rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-emerald-600">+100</div>
                <div className="text-sm text-gray-600">Clientes</div>
              </div>
               */}
            
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Educación y certificaciones</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Licenciada en kinesiología y fisiatría</h4>
                  <p className="text-sm text-gray-600">Universidad Adventista del Plata</p>
                  <p className="text-xs text-emerald-600 mt-1">2012</p>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Reeducación Postural Global - Método Souchard</h4>
                  <p className="text-sm text-gray-600">Universidad de Terapia Manual, Saint-Mont</p>
                  <p className="text-xs text-emerald-600 mt-1">2013</p>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Posgrado en ergonomía ocupacional</h4>
                  <p className="text-sm text-gray-600">Universidad Nacional del Comahue</p>
                  <p className="text-xs text-emerald-600 mt-1">2024</p>
                </div>
              </div>
            </div>
          </div>
  

        </div>
      </div>
    </section>
  );
};

export default About;