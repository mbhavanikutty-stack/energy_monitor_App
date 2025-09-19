import React from 'react';
import './Landing.css';
import FuturisticAnimation from '../components/animation/FuturisticAnimation';

const Landing = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <FeaturesSection />
      <GrowthSection />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="hero-section">
      <FuturisticAnimation />
      <div className="hero-content">
        <h1 className="hero-headline">Powering Your Home with Smart Energy</h1>
        <p className="hero-subheading">
          A data-driven assistant for environmentally conscious households to save money and reduce their carbon footprint.
        </p>
        <div className="hero-cta-buttons">
          <button className="cta-button primary">Get Started</button>
          <button className="cta-button secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { icon: '🧑', title: 'Deep Personalization', description: 'Recommendations based on your specific household size, location, and appliance usage.' },
    { icon: '👍', title: 'Simplicity & Ease of Use', description: 'Input your data quickly and receive personalized suggestions without technical expertise.' },
    { icon: '💰', title: 'Direct Cost Savings', description: 'Tangible financial benefits by significantly reducing your monthly energy bills.' },
    { icon: '💡', title: 'Actionable & Focused Insights', description: 'Five clear and concise suggestions, empowering you to take immediate action.' },
  ];

  return (
    <section className="features-section">
      <h2 className="section-headline">Key Advantages</h2>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const GrowthSection = () => {
  return (
    <section className="growth-section">
      <h2 className="section-headline">Potential Growth</h2>
      <div className="growth-columns">
        <div className="growth-column">
          <h3 className="growth-title">New Features & Integrations</h3>
          <ul>
            <li>Real-time energy monitoring</li>
            <li>Gamification and community challenges</li>
            <li>Smart home integration</li>
          </ul>
        </div>
        <div className="growth-column">
          <h3 className="growth-title">Strategic Partnerships</h3>
          <ul>
            <li>Collaborations with utility companies</li>
            <li>Partnerships with appliance retailers</li>
            <li>Integration with smart home platforms</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Landing;