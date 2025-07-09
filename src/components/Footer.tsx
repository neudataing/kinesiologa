import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Logo Section */}
          <div className="flex flex-col items-start lg:items-center">
            <img
              src="/img/Logo-Completo-ES-blanco.png"
              alt="Logo"
              className="max-h-[400px] w-auto mb-8"
            />
            {/* Social Media Icons */}
            <div className="flex space-x-6">
              <a
                href="https://www.facebook.com/profile.php?id=61573965166136"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              >
                <Facebook className="h-8 w-8" />
              </a>
              <a
                href="https://www.instagram.com/ergonomia.schenkel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
              >
                <Instagram className="h-8 w-8" />
              </a>
            </div>
          </div>

          {/* Contact Information - Right Side */}
          <div className="lg:pl-12">
            <h3 className="text-2xl font-semibold mb-8 text-center lg:text-left">Contacto</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Teléfono</span>
                  <a 
                    href="tel:+542993277906" 
                    className="text-white hover:text-blue-400 transition-colors duration-300 text-lg font-medium"
                  >
                    (299) 327-7906
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Email</span>
                  <a 
                    href="mailto:elianaschenkel@gmail.com" 
                    className="text-white hover:text-blue-400 transition-colors duration-300 text-lg font-medium"
                  >
                    elianaschenkel@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Dirección</span>
                  <div className="text-white text-lg">
                    Los Aromos N° 1328<br />
                    General Fernández Oro<br />
                    Río Negro, Argentina
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="text-gray-400 text-sm">
              © 2025 Eliana Schenkel. Todos los derechos reservados.
            </div>
            <div className="text-gray-400 text-sm">
              Desarrollado por <a href="https://www.neudata.com.ar" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400 transition-colors duration-300">Neudata Ingeniería</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;