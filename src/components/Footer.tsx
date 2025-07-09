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
        <div className="grid lg:grid-cols-2 items-center">
          
          {/* Logo */}
          <div className="w-full flex justify-start px-4">
            <img
              src="/img/Logo-Completo-ES-blanco.png"
              alt="Logo"
              className="max-h-[600px] w-auto"
            />
          </div>

          {/* Redes sociales alineadas a la derecha */}
          <div className="w-full flex justify-end px-4 space-x-6">
            <a
              href="https://www.facebook.com/profile.php?id=61573965166136"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
            >
              <Facebook className="h-10 w-10" />
            </a>
            <a
              href="https://www.instagram.com/ergonomia.schenkel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
            >
              <Instagram className="h-10 w-10" />
            </a>
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
