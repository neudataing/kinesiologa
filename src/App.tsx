import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services2 from './components/Services2';
import FAQ from './components/FAQ';
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
            <About />
            <Services2 />
            <FAQ />
            <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;