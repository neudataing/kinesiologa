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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Logo + Redes */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <img
              src="/img/Logo-Completo-ES-blanco.png"
              alt="Logo"
              className="h-32 w-auto mb-6"
            />
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

          {/* Información de contacto */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+542993277906" className="text-gray-300 hover:text-brand-400 transition-colors">
                  (299) 327-7906
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:elianaschenkel@gmail.com" className="text-gray-300 hover:text-brand-400 transition-colors">
                  elianaschenkel@gmail.com
                </a>
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
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="text-gray-400 text-sm">
              © 2025 Eliana Schenkel. Todos los derechos reservados.
            </div>

            <div className="text-gray-400 text-sm">
            Desarrollado por <a href="https://www.neudata.com.ar" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-400">Neudata Ingeniería</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
