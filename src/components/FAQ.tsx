import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqs = [
  {
    question: "¿Qué es la Reeducación Postural Global (RPG)?",
    answer: "RPG es un método terapéutico suave y personalizado que busca corregir desequilibrios posturales y aliviar dolores crónicos. A través de posturas guiadas y trabajo respiratorio, se mejora la alineación corporal y se reduce la tensión muscular. Es un método de terapia manual aplicado por kinesiólogos especializados que evalúa, diagnostica y trata."
  },
  {
    question: "¿En qué casos está indicada la RPG?",
    answer: "RPG es útil para tratar dolores de espalda (cervicalgias, lumbalgias), hernias de disco, escoliosis, problemas posturales y sobrecargas por malas posturas laborales. También se recomienda de forma preventiva, especialmente en personas que trabajan muchas horas sentadas o con esfuerzos repetitivos."
  },
  {
    question: "¿Qué diferencia RPG de otros métodos de kinesiología?",
    answer: "La RPG trata al cuerpo como una unidad. En lugar de centrarse solo en el síntoma, busca la causa postural del problema, permitiendo un tratamiento más profundo y duradero. No es invasiva y se adapta a cada persona según su condición física y dolencias."
  },
  {
    question: "¿Qué es una evaluación ergonómica en empresas?",
    answer: "Es un análisis de los puestos de trabajo para identificar riesgos posturales y proponer mejoras que cuiden la salud del trabajador. Se evalúan mobiliarios, herramientas, organización de tareas y factores psicosociales. Se sugieren ajustes para prevenir lesiones musculoesqueléticas y garantizar el bienestar laboral."
  },
  {
    question: "¿Cómo pueden ayudar tus servicios de ergonomía a mi empresa?",
    answer: "Ayudan a reducir el ausentismo laboral por dolores o lesiones, mejorar el bienestar y la productividad de los empleados, cumplir normativas de salud y seguridad, y fomentar una cultura preventiva en la organización."
  },
  {
    question: "¿Realizás capacitaciones o talleres?",
    answer: "Sí. Brindo talleres personalizados sobre pausas activas, higiene postural, ergonomía y cuidado corporal en entornos laborales. Están dirigidos a empleados, supervisores o responsables de salud y seguridad."
  },
  {
    question: "¿Dónde atendés o brindás servicios?",
    answer: "Atiendo de forma presencial en General Fernández Oro, Río Negro y también ofrezco asesoramientos, talleres y capacitaciones en empresas de todo el país. Algunos servicios también pueden realizarse de forma virtual."
  },
  {
    question: "¿Cómo puedo solicitar un turno o una propuesta para mi empresa?",
    //answer: "Podés contactarme por WhatsApp o correo electrónico haciendo click aquí. En el caso de empresas, armo propuestas personalizadas según la necesidad, tipo de trabajo y cantidad de personas."
    answer: (
      <>
        Podés contactarme por WhatsApp o correo electrónico{" "}
        <a href="#contact" className="text-brand-600 underline hover:text-brand-700">
          haciendo click aquí
        </a>
        . En el caso de empresas, armo propuestas personalizadas según la necesidad, tipo de trabajo y cantidad de personas.
      </>
    )
  },
  {
    question: "¿Trabajás con obras sociales o solo de forma particular?",
    answer: "Trabajo de forma particular y con las obras sociales que tengan la práctica convenida. Para tratamientos individuales, puedo entregarte la documentación necesaria para que solicites reintegros si tu obra social lo permite."
  }
];


  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Preguntas <span className="text-brand-600">frecuentes</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revisa las preguntas frecuentes y encuentra las respuestas a tus consultas.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 pr-4">
                      {faq.question}
                    </h3>
                    {openItems.includes(index) ? (
                      <ChevronUp className="h-6 w-6 text-brand-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  
                  {openItems.includes(index) && (
                    <div className="px-8 pb-6">
                      <div className="border-t border-gray-100 pt-6">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/** 
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions? I'm here to help!
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-brand-600 text-white text-lg font-semibold rounded-full hover:bg-brand-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </button>
          </div>
        */}

        </div>
      </div>
    </section>
  );
};

export default FAQ;