import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoVersion, setLogoVersion] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      // Detectar scroll para el fondo del header
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      // Cambiar logo según la posición en el Hero
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const heroTop = heroSection.offsetTop;
        const scrollPosition = window.scrollY;
        
        // Calculamos el punto en el que el scroll ha pasado el 40% de la sección Hero
        const triggerPoint = heroTop + heroHeight * 0.4;
        setLogoVersion(scrollPosition > triggerPoint ? 'light' : 'dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Ejecutar una vez al montar para establecer el estado inicial
    handleScroll();

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
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/98 backdrop-blur-md shadow-lg shadow-gray-900/5' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center space-x-2">
            <img
              src={logoVersion === 'dark' 
                ? "/img/Logo-Completo-ES-Invertido.png" 
                : "/img/Logo-Completo-ES.png"}
              alt="Logo"
              className="h-16 lg:h-20 w-auto object-contain transition-all duration-500"
            />
          </div>
          

          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-800 text-base font-semibold hover:text-brand-500 transition-all duration-300 relative group"
            >
              Inicio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-800 text-base font-semibold hover:text-brand-500 transition-all duration-300 relative group"
            >
              Acerca de
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button 
              onClick={() => scrollToSection('services2')}
              className="text-gray-800 text-base font-semibold hover:text-brand-500 transition-all duration-300 relative group"
            >
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            
          
            <button 
              onClick={() => scrollToSection('FAQ')}
              className="text-gray-800 text-base font-semibold hover:text-brand-500 transition-all duration-300 relative group"
            >
              Preguntas frecuentes
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
            </button>

            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-800 text-base font-semibold hover:text-brand-500 transition-all duration-300 relative group"
            >
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full"></span>
             </button>
           
            <a
              href="https://wa.me/5492993277906?text=Hola%2C%20quiero%20agendar%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-300 text-white px-6 py-3 rounded-full hover:bg-brand-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Agendar consulta
            </a>

          </div>
               

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-brand-600"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100/50 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-lg transition-all duration-200"
              >
                Inicio
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-lg transition-all duration-200"
              >
                Acerca de
              </button>
              <button 
                onClick={() => scrollToSection('services2')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-lg transition-all duration-200"
              >
                Servicios
              </button>
              
              <button 
                onClick={() => scrollToSection('FAQ')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-lg transition-all duration-200"
              >
                Preguntas frecuentes
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-3 text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-lg transition-all duration-200"
              >
                Contacto
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;