import React from 'react';
import { Award, BookOpen, Users, Target, Crosshair, Eye, HeartHandshake } from 'lucide-react';
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
              Soy Eliana Schenkel (MPRN 1002), kinesióloga especializada en reeducación postural (RPG) y ergonomía ocupacional. 
              Trabajo en sesiones individuales y también asesoro a empresas en el cuidado postural de sus equipos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            <div className="space-y-8 lg:space-y-10">
              <div className="prose prose-lg text-gray-600">
                <p className="text-base lg:text-lg leading-relaxed text-gray-600">
                  Con más de 10 años de experiencia en kinesiología y terapia del movimiento, he dedicado mi carrera 
                  a ayudar a personas a superar limitaciones físicas y alcanzar sus objetivos de bienestar. 
                  Mi enfoque combina técnicas basadas en la evidencia con atención personalizada para abordar 
                  las necesidades únicas de cada cliente.
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
                    <p className="text-sm lg:text-base text-gray-600">Actualizaciones constantes en las últimas técnicas.</p>
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
            </div>
          </div>

          {/* Sección de Educación y Certificaciones con efecto hover */}
          <div className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8 lg:mb-12 text-center">
              Educación y certificaciones
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div 
                className="bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 
                          transform hover:scale-105 hover:shadow-lg border border-gray-100 cursor-pointer"
              >
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-gray-300">
                  <BookOpen className="h-6 w-6 text-brand-600" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Licenciada en kinesiología y fisiatría</h4>
                <p className="text-sm text-gray-600 mb-2">Universidad Adventista del Plata</p>
                <p className="text-xs text-brand-600 font-medium mt-3">2012</p>
              </div>
              
              <div 
                className="bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 
                          transform hover:scale-105 hover:shadow-lg border border-gray-100 cursor-pointer"
              >
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-gray-300">
                  <Award className="h-6 w-6 text-brand-600" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Reeducación Postural Global - Método Souchard</h4>
                <p className="text-sm text-gray-600 mb-2">Universidad de Terapia Manual, Saint-Mont</p>
                <p className="text-xs text-brand-600 font-medium mt-3">2013</p>
              </div>
              
              <div 
                className="bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 
                          transform hover:scale-105 hover:shadow-lg border border-gray-100 cursor-pointer"
              >
                <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4 border border-gray-300">
                  <Users className="h-6 w-6 text-brand-600" />
                </div>
                <h4 className="font-bold text-lg text-gray-900 mb-2">Posgrado en ergonomía ocupacional</h4>
                <p className="text-sm text-gray-600 mb-2">Universidad Nacional del Comahue</p>
                <p className="text-xs text-brand-600 font-medium mt-3">2024</p>
              </div>
            </div>
          </div>

          {/* Nueva sección: Misión, Visión y Valores */}
          <div className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-12 text-center">
              Nuestros principios fundamentales
            </h3>
            
            <div className="grid md:grid-cols-3 gap-10">
              {/* Misión */}
              <div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl 
                          transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center border border-gray-300">
                    <Crosshair className="h-8 w-8 text-brand-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Misión</h4>
                <p className="text-gray-600 text-center">
                  Brindar atención kinesiológica integral que combine reeducación postural y ergonomía para 
                  mejorar la calidad de vida de mis pacientes, ayudándoles a moverse mejor, vivir sin dolor 
                  y alcanzar su máximo potencial físico en entornos personales y laborales.
                </p>
              </div>
              
              {/* Visión */}
              <div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl 
                          transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center border border-gray-300">
                    <Eye className="h-8 w-8 text-brand-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Visión</h4>
                <p className="text-gray-600 text-center">
                  Ser referente en kinesiología avanzada y ergonomía ocupacional, transformando la 
                  relación de las personas con su cuerpo y promoviendo entornos laborales saludables 
                  donde la prevención y el bienestar postural sean pilares fundamentales.
                </p>
              </div>
              
              {/* Valores */}
              <div 
                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl 
                          transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center border border-gray-300">
                    <HeartHandshake className="h-8 w-8 text-brand-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 text-center">Valores</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-brand-600 font-bold mr-2">•</span>
                    <span>Excelencia profesional basada en evidencia científica</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 font-bold mr-2">•</span>
                    <span>Empatía y atención personalizada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 font-bold mr-2">•</span>
                    <span>Compromiso con resultados tangibles</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 font-bold mr-2">•</span>
                    <span>Innovación en técnicas terapéuticas</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-brand-600 font-bold mr-2">•</span>
                    <span>Ética y responsabilidad profesional</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;