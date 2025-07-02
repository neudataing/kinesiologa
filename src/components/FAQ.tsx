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
      question: "What is kinesiology and how can it help me?",
      answer: "Kinesiology is the scientific study of human movement. As a kinesiologist, I analyze your movement patterns, posture, and muscle function to identify imbalances and dysfunction. This helps address pain, improve performance, prevent injuries, and optimize your overall physical health through targeted exercises and treatments."
    },
    {
      question: "What's the difference between postural and reductive treatments?",
      answer: "Postural treatments focus on correcting alignment issues, improving spinal posture, and addressing muscle imbalances that affect your daily posture. Reductive treatments are more targeted interventions that reduce specific dysfunctions, restore optimal movement patterns, and address particular problem areas or injuries."
    },
    {
      question: "How effective are virtual sessions compared to in-person visits?",
      answer: "Virtual sessions are highly effective for postural assessments, movement analysis, exercise instruction, and ongoing support. I can observe your posture, guide you through exercises, and provide real-time feedback. In-person sessions allow for hands-on techniques and more detailed physical assessments. Many clients successfully combine both formats."
    },
    {
      question: "What should I expect during my first consultation?",
      answer: "Your first session includes a comprehensive health history review, postural and movement assessment, discussion of your goals and concerns, and development of a personalized treatment plan. I'll also provide initial exercises or recommendations you can start immediately. Sessions typically last 60-90 minutes for in-person or 45-60 minutes for virtual."
    },
    {
      question: "How many sessions will I need to see results?",
      answer: "Results vary based on your condition, goals, and compliance with recommendations. Many clients notice improvements within 2-3 sessions, with significant changes typically seen within 6-8 sessions. Chronic conditions may require longer treatment periods. I'll provide a realistic timeline during your initial assessment."
    },
    {
      question: "Do you work with specific conditions or injuries?",
      answer: "Yes, I work with a wide range of conditions including chronic pain, postural dysfunction, sports injuries, work-related strain, movement disorders, and injury prevention. I also help athletes optimize performance and individuals preparing for physical activities or recovery from surgery."
    },
    {
      question: "What equipment do I need for virtual sessions?",
      answer: "For virtual sessions, you'll need a computer or tablet with a good camera and internet connection, enough space to move around (about 6x6 feet), and comfortable workout clothes. I may recommend basic props like resistance bands or small weights, but I'll work with whatever you have available."
    },
    {
      question: "Are your services covered by insurance?",
      answer: "Coverage varies by insurance provider and plan. Many health savings accounts (HSAs) and flexible spending accounts (FSAs) cover kinesiology services. I can provide receipts and documentation needed for insurance reimbursement. Please check with your provider about coverage for preventive care and rehabilitation services."
    },
    {
      question: "How do I prepare for my appointment?",
      answer: "Wear comfortable, form-fitting clothes that allow me to observe your movement. Bring any relevant medical records or imaging results. For virtual sessions, test your technology beforehand and ensure good lighting. Come prepared to discuss your health history, current symptoms, and goals."
    },
    {
      question: "What makes your approach different from other practitioners?",
      answer: "I combine evidence-based kinesiology principles with personalized care, offering both virtual and in-person options for maximum flexibility. My approach focuses on education, empowering you with knowledge about your body, and providing practical solutions you can implement in daily life. I also emphasize long-term wellness rather than just symptom management."
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
              Frequently Asked <span className="text-emerald-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about kinesiology treatments, virtual sessions, and how I can help you achieve your health goals.
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
                      <ChevronUp className="h-6 w-6 text-emerald-600 flex-shrink-0" />
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

          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-6">
              Still have questions? I'm here to help!
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;