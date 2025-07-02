import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Testimonials: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "New York, NY",
      rating: 5,
      text: "Eliana transformed my chronic back pain through her virtual sessions. Her postural correction program was life-changing. I can now work long hours without discomfort!",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, CA",
      rating: 5,
      text: "The in-person reductive treatments helped me recover from a sports injury faster than I expected. Eliana's expertise and personalized approach made all the difference.",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Emma Rodriguez",
      location: "Miami, FL",
      rating: 5,
      text: "I love the flexibility of virtual sessions! Eliana's guidance helped me correct my posture while working from home. Professional, knowledgeable, and incredibly supportive.",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "David Thompson",
      location: "Chicago, IL",
      rating: 5,
      text: "After years of neck pain from desk work, Eliana's postural treatment program gave me my life back. The combination of education and practical exercises was perfect.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Lisa Park",
      location: "Seattle, WA",
      rating: 5,
      text: "Eliana's reductive treatments helped me prepare for a marathon. Her movement analysis identified issues I didn't even know I had. Highly recommended!",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Robert Martinez",
      location: "Austin, TX",
      rating: 5,
      text: "The virtual consultation was surprisingly effective. Eliana's attention to detail and follow-up care exceeded my expectations. My shoulder pain is completely gone!",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Clients <span className="text-emerald-600">Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from people who have transformed their health and wellness through our kinesiology services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <div className="flex mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 text-emerald-200 absolute -top-2 -left-2" />
                  <p className="text-gray-600 leading-relaxed italic pl-6">
                    "{testimonial.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-emerald-50 rounded-3xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Success Stories</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to experience the transformation? Book your consultation today and start your journey to better health and movement.
            </p>
            <button 
              onClick={() => {
                const element = document.getElementById('booking');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Your Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;