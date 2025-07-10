import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services2 from './components/Services2';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="relative">
          {/* Hero Section - Full viewport height */}
          <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Hero />
          </section>
          
          {/* About Section */}
          <section className="relative bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 py-16 lg:py-20">
            <About />
          </section>
          
          {/* Services Section */}
          <section className="relative bg-gradient-to-br from-blue-50/20 via-gray-50/40 to-white py-16 lg:py-20">
            <Services2 />
          </section>
          
          {/* Contact Section */}
          <section className="relative bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 py-16 lg:py-20">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;