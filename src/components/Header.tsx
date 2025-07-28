import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoVersion, setLogoVersion] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const heroTop = heroSection.offsetTop;
        const scrollPosition = window.scrollY;
        const triggerPoint = heroTop + heroHeight * 0.5;
        setLogoVersion(scrollPosition > triggerPoint ? 'light' : 'dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define un texto que cambie según el estado del logo
  const navTextColor = logoVersion === 'dark'
    ? 'text-white hover:text-brand-100'
    : 'text-gray-800 hover:text-brand-300';

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/98 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className={`relative h-16 lg:h-20 ${logoVersion === 'dark' ? 'mt-2.5' : 'mt-0'}`}>
            <img
              src="/img/Logo-Completo-ES-Invertido.png"
              alt="Logo Dark"
              className={`h-full w-auto object-contain transition-opacity duration-500 ${
                logoVersion === 'dark' ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <img
              src="/img/Logo-Completo-ES.png"
              alt="Logo Light"
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                logoVersion === 'light' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* Links de escritorio */}
          <div className="hidden md:flex items-center space-x-12">
            {['home','about','services2','FAQ','contact'].map((id, idx) => {
              const label = ['Inicio','Acerca de','Servicios','Preguntas frecuentes','Contacto'][idx];
              return (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`${navTextColor} text-base font-semibold transition-all duration-300 relative group`}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-500 transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}

            <a
              href="https://wa.me/5492993277906?text=Hola%2C%20quiero%20agendar%20una%20consulta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-300 text-white px-6 py-3 rounded-full hover:bg-brand-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Agendar consulta
            </a>
          </div>

          {/* Botón móvil */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${logoVersion === 'dark' ? 'text-white' : 'text-gray-700'} hover:text-brand-600`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menú móvil desplegable */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-md border-t border-gray-100/50 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home','about','services2','FAQ','contact'].map((id, idx) => {
                const label = ['Inicio','Acerca de','Servicios','Preguntas frecuentes','Contacto'][idx];
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`block w-full text-left px-4 py-3 ${navTextColor} hover:bg-brand-50/50 rounded-lg transition-all duration-200`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;