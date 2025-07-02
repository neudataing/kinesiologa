import React, { useState } from 'react';
import { Calendar, Clock, Monitor, MapPin, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Booking: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Booking form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        sessionType: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-12 shadow-lg">
              <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Request Received!</h2>
              <p className="text-gray-600 mb-6">
                Thank you for your interest! I'll review your request and contact you within 24 hours to confirm your appointment and discuss any specific needs.
              </p>
              <p className="text-sm text-gray-500">
                Check your email for a confirmation message with next steps.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-emerald-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Book Your <span className="text-emerald-600">Consultation</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to start your journey to better health? Schedule your personalized consultation today and take the first step towards optimal movement and wellness.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Booking Information */}
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What to Expect</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <Calendar className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Flexible Scheduling</h4>
                        <p className="text-gray-600 text-sm">Available Monday-Saturday with morning, afternoon, and evening slots</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Clock className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Session Duration</h4>
                        <p className="text-gray-600 text-sm">45-60 minutes for virtual, 60-90 minutes for in-person consultations</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Monitor className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">Virtual Sessions</h4>
                        <p className="text-gray-600 text-sm">Secure video consultations via Zoom or your preferred platform</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-emerald-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">In-Person Location</h4>
                        <p className="text-gray-600 text-sm">Professional clinic in downtown area with easy parking access</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Response Guarantee</h3>
                  <p className="text-gray-600">
                    I'll personally review your booking request and respond within 24 hours to confirm your appointment and discuss any specific needs or questions you may have.
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <div className="bg-white rounded-3xl p-8 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="sessionType" className="block text-sm font-medium text-gray-700 mb-2">
                      Session Type *
                    </label>
                    <select
                      id="sessionType"
                      name="sessionType"
                      required
                      value={formData.sessionType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    >
                      <option value="">Select session type</option>
                      <option value="virtual-postural">Virtual - Postural Treatment</option>
                      <option value="virtual-reductive">Virtual - Reductive Treatment</option>
                      <option value="inperson-postural">In-Person - Postural Treatment</option>
                      <option value="inperson-reductive">In-Person - Reductive Treatment</option>
                      <option value="consultation">Initial Consultation</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time
                      </label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      >
                        <option value="">Select time</option>
                        <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                        <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Tell me about your needs
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                      placeholder="Describe your current concerns, goals, or any specific areas you'd like to focus on..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Book My Consultation
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting this form, you agree to receive communication from Eliana Kinesiology. 
                    Your information is kept confidential and secure.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;