import React from 'react';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

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
              <span className="text-xl lg:text-2xl font-bold text-gray-900">Eliana</span>
              <span className="text-xl lg:text-2xl font-bold text-gray-900">Schenkel</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transformando vidas a través de tratamientos expertos de kinesiología. Corrección postural profesional y terapia reductiva disponibles de forma virtual y presencial.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61573965166136&rdid=mhStVTW9dvuuJqne&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Ek7jvNP4w%2F#"
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
              <a
                href="https://www.linkedin.com/in/tu_perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-brand-400 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>

          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Links</h3>
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
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-brand-400 transition-colors"
                >
                  Testimonios
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="text-gray-300 hover:text-brand-400 transition-colors"
                >
                  Agendar Consulta
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Servicios</h3>
            <ul className="space-y-3 text-gray-300">
              <li>Postural Correction</li>
              <li>Reductive Treatments</li>
              <li>Virtual Consultations</li>
              <li>In-Person Sessions</li>
              <li>Movement Analysis</li>
              <li>Injury Prevention</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-brand-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-brand-400 transition-colors">
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
                  Los Aromos N°1328<br />
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
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-brand-400 transition-colors">
                Política de privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-400 transition-colors">
                Terminos de servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-400 transition-colors">
                Accesibilidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;