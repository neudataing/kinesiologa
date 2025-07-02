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
              Get in <span className="text-emerald-600">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your wellness journey? I'm here to answer your questions and help you take the first step towards better health and movement.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-emerald-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Phone</h4>
                      <p className="text-gray-600">
                        <a href="tel:+15551234567" className="hover:text-emerald-600 transition-colors">
                          (555) 123-4567
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Available Mon-Fri, 9AM-6PM</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Email</h4>
                      <p className="text-gray-600">
                        <a href="mailto:hello@elianakinesiology.com" className="hover:text-emerald-600 transition-colors">
                          hello@elianakinesiology.com
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">24-hour response guarantee</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Clinic Location</h4>
                      <p className="text-gray-600">
                        123 Wellness Street<br />
                        Suite 400<br />
                        City, State 12345
                      </p>
                      <p className="text-sm text-gray-500">Free parking available</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MessageCircle className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">WhatsApp</h4>
                      <p className="text-gray-600">
                        <a href="https://wa.me/15551234567" className="hover:text-emerald-600 transition-colors">
                          Quick chat available
                        </a>
                      </p>
                      <p className="text-sm text-gray-500">Fast responses during business hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Office Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="text-gray-900 font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Saturday</span>
                    <span className="text-gray-900 font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sunday</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-medium text-gray-900">
                      Emergency consultations available by appointment
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              <div className="bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
                <div className="h-80 bg-gradient-to-br from-emerald-200 to-blue-200 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="h-16 w-16 mx-auto mb-4 text-emerald-600" />
                    <p className="text-lg font-medium">Interactive Map</p>
                    <p className="text-sm">Google Maps integration would go here</p>
                    <p className="text-xs mt-2">
                      Easy access with public transportation<br />
                      Free parking available on-site
                    </p>
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