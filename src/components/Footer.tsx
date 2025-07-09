import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram} from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img
                src="/img/Logo-ES.png"
                alt="Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-xl lg:text-2xl font-bold text-gray-300">Eliana</span>
              <span className="text-xl lg:text-2xl font-bold text-gray-300">Schenkel</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformando vidas a través de tratamientos expertos de kinesiología. Corrección postural profesional y terapia reductiva disponibles de forma virtual y presencial.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61573965166136"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-400 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/ergonomia.schenkel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-400 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>

          </div>

        {/**
          <div>
            <h3 className="text-lg font-semibold mb-6">Enlaces</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-brand-400 transition-colors"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-brand-400 transition-colors"
                >
                  Acerca de Eliana
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-brand-400 transition-colors"
                >
                  Servicios

                </button>
              </li>
            </ul>
            
          </div>
        */}

    

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+542993277906" className="text-gray-300 hover:text-brand-400 transition-colors">
                    (299) 327-7906
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:elianaschenkel@gmail.com" className="text-gray-300 hover:text-brand-400 transition-colors">
                    elianaschenkel@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300">
                  Los Aromos N° 1328<br />
                  General Fernández Oro<br />
                  Río Negro, Argentina
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Eliana Schenkel. Todos los derechos reservados.
            
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;