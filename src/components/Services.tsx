import React from 'react';
import { Monitor, MapPin, Zap, Heart, Users, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Services: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Servicios <span className="text-emerald-600">profesionales</span>
            </h2>
          </div>

          {/* Service Categories */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Heart className="h-12 w-12 text-emerald-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Postural Treatments</h3>
                  <p className="text-emerald-600 font-medium">Correct & Align</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive postural analysis and correction techniques to improve alignment, reduce pain, and enhance overall movement quality.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Spinal alignment assessment
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Corrective exercise programs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Ergonomic consultations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  Pain reduction strategies
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <Zap className="h-12 w-12 text-blue-600 mr-4" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Reductive Treatments</h3>
                  <p className="text-blue-600 font-medium">Strengthen & Optimize</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Targeted interventions to reduce dysfunction, improve mobility, and restore optimal movement patterns for enhanced performance.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Movement pattern analysis
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Muscle imbalance correction
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Injury prevention programs
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Performance optimization
                </li>
              </ul>
            </div>
          </div>

          {/* Delivery Methods */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Choose Your Preferred Format
            </h3>
            
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="text-center">
                <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Monitor className="h-10 w-10 text-emerald-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Virtual Sessions</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Convenient online consultations from the comfort of your home. Perfect for postural assessments, exercise guidance, and follow-up sessions.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm text-gray-600">45-60 min</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm text-gray-600">1-on-1</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-600 mb-2">$75</div>
                <div className="text-sm text-gray-600">per session</div>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">In-Person Sessions</h4>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Hands-on treatment sessions in a professional clinic setting. Ideal for comprehensive assessments and manual therapy techniques.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">60-90 min</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-gray-600">1-on-1</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">$120</div>
                <div className="text-sm text-gray-600">per session</div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
              <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Package Deals Available</h4>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-emerald-600">3 Sessions</div>
                  <div className="text-sm text-gray-600">Save 10%</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-emerald-600">6 Sessions</div>
                  <div className="text-sm text-gray-600">Save 15%</div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="text-lg font-bold text-emerald-600">12 Sessions</div>
                  <div className="text-sm text-gray-600">Save 20%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;