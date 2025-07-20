import React from 'react';
import {Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => {

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-4">
        <div className="grid lg:grid-cols-2 items-center">
          
          <div className="w-full flex justify-center lg:justify-start px-4 lg:px-16 mb-8 lg:mb-0">
            <img
              src="/img/Logo-Completo-ES-blanco.png"
              alt="Logo"
              className="max-h-32 lg:max-h-40 w-auto"
            />
          </div>

          <div className="w-full flex justify-center lg:justify-end px-4 lg:px-16 space-x-6">
            <a
              href="https://www.facebook.com/profile.php?id=61573965166136"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
            >
              <Facebook className="h-8 w-8 lg:h-10 lg:w-10" />
            </a>
            <a
              href="https://www.instagram.com/ergonomia.schenkel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110"
            >
              <Instagram className="h-8 w-8 lg:h-10 lg:w-10" />
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 lg:mt-12 pt-6 lg:pt-8">
          <div className="flex flex-col justify-center items-center space-y-2">
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
