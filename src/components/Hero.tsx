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
            <div className="flex items-center space-x-2 text-emerald-600">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium">Trusted by 500+ clients</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your Health with
              <span className="text-emerald-600 block">Expert Kinesiology</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Professional postural correction and reductive treatments designed to help you move better, 
              feel stronger, and live pain-free. Available both virtually and in-person.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => scrollToSection('booking')}
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Book Your Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              
              <button 
                onClick={() => scrollToSection('services')}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-emerald-600 text-emerald-600 text-lg font-semibold rounded-full hover:bg-emerald-600 hover:text-white transition-all duration-200"
              >
                <PlayCircle className="mr-2 h-5 w-5" />
                Learn More
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-sm text-gray-600">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600">95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/6111320/pexels-photo-6111320.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional kinesiologist treatment session"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Available Online</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">24h</div>
                <div className="text-xs text-gray-600">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;