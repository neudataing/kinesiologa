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
      <div className="min-h-screen bg-white">
        <Header />
        <main className="relative">
          {/* Hero Section - Full viewport height */}
            <Hero />
          {/* About Section */}
          <section className="bg-white py-8 lg:py-12">
            <About />
          </section>
          
          {/* Services Section */}
          <section className="bg-white py-8 lg:py-12">
            <Services2 />
          </section>
          
          {/* Contact Section */}
          <section className="bg-white py-8 lg:py-12">
            <Contact />
          </section>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;