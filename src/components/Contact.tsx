import React from 'react';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="bg-blue-50 pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div 
          ref={ref}
        className={`mb-12 transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-brand-300">Contáctame</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch">

            <div className="flex justify-center">
              <div className="py-12 lg:py-16 bg-white rounded-3xl shadow-xl p-6 lg:p-8 w-full max-w-md text-left">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 lg:mb-8">Información de contacto</h3>
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-brand-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base lg:text-lg">Celular</h4>
                      <p className="text-gray-600 text-sm lg:text-base">
                        <a href="tel:+542993277906" className="hover:text-brand-600 transition-colors">
                          (299) 327-7906
                        </a>
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-brand-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base lg:text-lg">Correo electrónico</h4>
                      <p className="text-gray-600 text-sm lg:text-base">
                        <a href="mailto:elianaschenkel@gmail.com" className="hover:text-brand-600 transition-colors">
                          elianaschenkel@gmail.com
                        </a>
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-brand-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base lg:text-lg">Dirección del consultorio</h4>
                      <p className="text-gray-600 text-sm lg:text-base">
                        Los Aromos 1328<br />
                        General Fernández Oro, Río Negro
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageCircle className="h-6 w-6 text-brand-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-base lg:text-lg">WhatsApp</h4>
                      <p className="text-gray-600 text-sm lg:text-base">
                        <a href="https://wa.me/+542993277906" className="hover:text-brand-600 transition-colors">
                          Click aquí para enviar un mensaje
                        </a>
                        </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-3xl shadow-lg h-full flex items-center justify-center overflow-hidden min-h-[400px] lg:min-h-[500px]">
                <iframe
                  title="Ubicación"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d548.5102992182807!2d-67.93180131000817!3d-38.950419124761225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a3a94597a3047%3A0xe5fa58e35e344fd5!2sLos%20Aromos%201328%2C%20R8324%20Gral.%20Fernandez%20Oro%2C%20R%C3%ADo%20Negro!5e0!3m2!1ses!2$ar!4v1751837678944!5m2!1ses!2$ar"
                  className="w-full h-full border-0 rounded-3xl"
                  allowFullScreen
                  loading="lazy"
                  style={{ minHeight: '400px' }}
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;