import React, { useState, useEffect } from 'react';
import { Menu, X} from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
        <div className="flex items-center space-x-2">
          <img
            src="/img/Logo-ES.png"
            alt="Logo"
            className="h-8 w-8 object-contain"
          />
          <span className="text-xl lg:text-2xl font-bold text-gray-900">Eliana</span>
          <span className="text-xl lg:text-2xl font-bold text-gray-900">Schenkel</span>
        </div>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
            >
              Inicio
            </button>

            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
            >
              Acerca de
            </button>

            <button 
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
            >
              Servicios
            

            {/**
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
            >
              Testimonios
               */}

            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
            >
              Contacto

            {/**
            </button>
            <button 
              onClick={() => scrollToSection('booking')}
              className="bg-brand-300 text-white px-6 py-2 rounded-full hover:bg-brand-400 transition-colors font-medium"
            >
              Agendar Consulta
            
            */}
            </button>

          </div>
               

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-brand-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md"
              >
                Acerca de
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md"
              >
                Servicios

              {/**
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md"
              >
                
                Testimonios
               */}

              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-brand-600 hover:bg-brand-50 rounded-md"
              >
                 
                Contacto
              {/**
              </button>
              <button 
                onClick={() => scrollToSection('booking')}
                className="block w-full text-left px-3 py-2 bg-brand-300 text-white hover:bg-brand-400 rounded-md font-medium"
              >
                Agendar Consulta
                 */}
                 
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;