import React from 'react';
import { Award, BookOpen, Users, Target } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const About: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* bloque animado */}
        <div
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* título y subtítulo */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Conocé a <span className="text-emerald-600">Eliana</span>
            </h2>
            <p className="text-xl text-gray-600 mx-auto">
              Soy Eliana, Licenciada en Kinesiología y Fisiatría. Me especializo en Reeducación Postural Global (RPG) y Ergonomía Ocupacional, ofreciendo asesoramiento a empresas para mejorar el bienestar laboral.
            </p>
          </div>

          {/* contenido en dos columnas */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* columna de texto */}
            <div className="space-y-8">
              {/* …tu texto… */}
            </div>

            {/* columna de imagen */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/img/Eliana.jpeg"
                  alt="Eliana, Professional Kinesiologist"
                  className="w-[400px] h-[350px] object-cover object-top"  {/* unidad px + object‑top */}
                />
              </div>

              {/* badge años de experiencia */}
              <div className="absolute -bottom-8 -left-8 bg-emerald-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">+5</div>
                <div className="text-sm opacity-90">Años de experiencia</div>
              </div>
            </div>
          </div> {/* <-- cierra .grid */}

          {/* bloque educación */}
          <div className="mt-16 bg-emerald-50 rounded-3xl p-8 lg:p-12">
            {/* …educación y certificados… */}
          </div>
        </div> {/* <-- cierra el div con ref */}
      </div>   {/* <-- cierra .container */}
    </section>  {/* <-- cierra <section> */}
  );
};


export default About;
