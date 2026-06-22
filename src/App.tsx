import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Visuals from './components/Visuals';
import Storytelling from './components/Storytelling';
import Chapters from './components/Chapters';
import CTAAbout from './components/CTAAbout';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-cream text-dark">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Visuals />
        <Storytelling />
        <Chapters />
        <CTAAbout />
      </main>
      <Footer />
    </div>
  );
};

export default App;
