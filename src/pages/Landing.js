import React from 'react';
import './Landing.css';
import Scene from '../components/animation/Scene';

const Landing = () => {
  return (
    <div className="landing-page-new">
      <div className="hero-section-new">
        <div className="hero-left">
          <h1 className="hero-headline-new">
            Smarter energy, creating a more <span className="highlight">sustainable</span> future.
          </h1>
          <button className="cta-button-new">
            <span>&rarr;</span>
          </button>
        </div>
        <div className="hero-right">
          <Scene />
        </div>
      </div>
      <StatisticsSection />
    </div>
  );
};

const StatisticsSection = () => {
  const stats = [
    { value: '98%', label: 'Customer Satisfaction' },
    { value: '15%', label: 'Avg. Bill Reduction' },
    { value: '350kg', label: 'CO₂ Saved per user/year' },
  ];

  return (
    <section className="statistics-section">
      <h2 className="section-headline-new">Energy Statistics</h2>
      <div className="statistics-grid">
        {stats.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Landing;