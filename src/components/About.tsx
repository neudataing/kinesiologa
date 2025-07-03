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
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet <span className="text-emerald-600">Eliana</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A passionate kinesiologist dedicated to helping people achieve optimal health through personalized movement therapy and postural correction.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="prose prose-lg text-gray-600">
                <p className="text-lg leading-relaxed">
                  With over 10 years of experience in kinesiology and movement therapy, I've dedicated my career to helping individuals overcome physical limitations and achieve their wellness goals. My approach combines evidence-based techniques with personalized care to address each client's unique needs.
                </p>
                
                <p className="text-lg leading-relaxed">
                  I specialize in postural correction and reductive treatments, offering both virtual consultations and in-person sessions. My mission is to empower you with the knowledge and tools needed to maintain a healthy, active lifestyle.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Award className="h-8 w-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Certified Professional</h3>
                    <p className="text-sm text-gray-600">Licensed Kinesiologist with multiple certifications</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <BookOpen className="h-8 w-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Continuous Learning</h3>
                    <p className="text-sm text-gray-600">Regularly updated with latest techniques and research</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="h-8 w-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Client-Centered</h3>
                    <p className="text-sm text-gray-600">Personalized treatment plans for every individual</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Target className="h-8 w-8 text-emerald-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Results-Driven</h3>
                    <p className="text-sm text-gray-600">Focused on achieving measurable improvements</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/img/Eliana.jpeg"
                  alt="Eliana, Professional Kinesiologist"
                  className="w-[400] h-[350] object-cover object-top"
                />
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-emerald-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm opacity-90">Years of Experience</div>
              </div>
              
              <div className="absolute -top-8 -right-8 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-emerald-600">500+</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-emerald-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Education & Certifications</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Master's in Kinesiology</h4>
                  <p className="text-sm text-gray-600">University of Health Sciences</p>
                  <p className="text-xs text-emerald-600 mt-1">2018</p>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Postural Restoration Certified</h4>
                  <p className="text-sm text-gray-600">Postural Restoration Institute</p>
                  <p className="text-xs text-emerald-600 mt-1">2019</p>
                </div>
              </div>
              <div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-semibold text-gray-900 mb-2">Movement Specialist</h4>
                  <p className="text-sm text-gray-600">International Movement Institute</p>
                  <p className="text-xs text-emerald-600 mt-1">2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
