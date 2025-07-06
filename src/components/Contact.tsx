import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Contact: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              <span className="text-emerald-600">Contáctame</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-emerald-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Celular</h4>
                      <p className="text-gray-600">
                        <a href="tel:+542993277906" className="hover:text-emerald-600 transition-colors">
                          (299) 3277906
                        </a>
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Correo electrónico</h4>
                      <p className="text-gray-600">
                        <a href="mailto:hello@elianakinesiology.com" className="hover:text-emerald-600 transition-colors">
                          elianaschenkel@gmail.com
                        </a>
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dirección del consultorio</h4>
                      <p className="text-gray-600">
                        Los Aromos 1328<br />
                        General Fernández Oro, Río Negro
                        </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                      <p className="text-gray-600">
                        <a href="https://wa.me/+542993277906" className="hover:text-emerald-600 transition-colors">
                          Click aquí para enviar un mensaje
                        </a>
                        </p>
                    </div>
                  </div>
                  </div>
                </div>
              </div>


            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                <div className="h-80 bg-gradient-to-br from-emerald-200 to-blue-200 flex items-center justify-center">
                  <div className="h-80 bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                    <iframe
                      title="Ubicación"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d548.5102992182807!2d-67.93180131000817!3d-38.950419124761225!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a3a94597a3047%3A0xe5fa58e35e344fd5!2sLos%20Aromos%201328%2C%20R8324%20Gral.%20Fernandez%20Oro%2C%20R%C3%ADo%20Negro!5e0!3m2!1ses!2sar!4v1751837678944!5m2!1ses!2sar"
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border-2 border-emerald-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response Promise</h3>
                <p className="text-gray-600 mb-6">
                  I understand that health concerns can't wait. That's why I guarantee a response to all inquiries within 24 hours, often much sooner during business hours.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Email responses within 2-4 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Phone calls returned same day</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">WhatsApp messages answered immediately</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={() => {
                    const element = document.getElementById('booking');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Schedule Your Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;