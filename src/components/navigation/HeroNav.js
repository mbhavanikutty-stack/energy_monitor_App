
import React from 'react';
import './HeroNav.css';

const HeroNav = () => {
  return (
    <nav className="hero-nav">
      <div className="hero-nav-logo">
        <a href="/">EcoSaver</a>
      </div>
      <div className="hero-nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How It Works</a>
        <a href="#pricing">Pricing</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="hero-nav-cta">
        <button className="cta-button secondary">Get Started</button>
      </div>
    </nav>
  );
};

export default HeroNav;
