// src/components/EnergyMonitor.js
import React, { useState } from 'react';
import './EnergyMonitor.css';

//const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

const EnergyMonitor = () => {
  const [billAmount, setBillAmount] = useState('');
  const [householdSize, setHouseholdSize] = useState('');
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEnergyTips = async () => {
    if (!billAmount || !householdSize) {
      alert('Please enter both your bill amount and household size.');
      return;
    }

    setLoading(true);
    const averageBill = 150; 
    const prompt = `The user's household has ${householdSize} people and a monthly energy bill of $${billAmount}. The average bill for a household of this size is $${averageBill}. Generate 5 actionable and personalized tips to help them reduce their energy consumption. For each tip, provide a very rough estimate of the potential annual savings in dollars. Use a bulleted list.`;

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDCNdgSlVc14RHYzzAFh6ipaHtqilzoDhw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      const parsedTips = generatedText.split(/\n\*\s?/).filter(tip => tip.trim() !== '');
      setTips(parsedTips);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to get energy-saving tips. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="energy-monitor-container">
      <h1>Home Energy Monitor ⚡️</h1>
      <div className="input-form">
        <input
          type="number"
          placeholder="Monthly Bill Amount ($)"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Household Size"
          value={householdSize}
          onChange={(e) => setHouseholdSize(e.target.value)}
        />
        <button onClick={fetchEnergyTips} disabled={loading}>
          {loading ? 'Generating...' : 'Get My Tips'}
        </button>
      </div>

      {tips.length > 0 && (
        <div className="tips-list">
          <h2>Your Personalized Tips:</h2>
          <ul>
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EnergyMonitor;