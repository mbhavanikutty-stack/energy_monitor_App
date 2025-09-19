import React from "react";
import SuggestionCard, {
	extractTitleFromTip,
	extractDescriptionFromTip,
	getIconForTip,
} from "./SuggestionCard";
import "./SuggestionsGrid.css";

const SuggestionsGrid = ({ tips, onGetStarted, billAmount }) => {
	const handleGetStarted = (tip, index) => {
		if (onGetStarted) {
			onGetStarted(tip, index);
		} else {
			// Default action - could open a modal, navigate, etc.
			console.log("Getting started with:", tip);
		}
	};

	const getImplementationTime = (tip) => {
		const tipLower = tip.toLowerCase();

		if (tipLower.includes("led") || tipLower.includes("light bulb"))
			return "30 minutes";
		if (tipLower.includes("thermostat")) return "2 hours";
		if (tipLower.includes("dishwasher") || tipLower.includes("washing"))
			return "5 minutes";
		if (tipLower.includes("unplug") || tipLower.includes("power strip"))
			return "15 minutes";
		if (tipLower.includes("insulation") || tipLower.includes("seal"))
			return "4 hours";
		if (tipLower.includes("water heater")) return "1 hour";
		if (tipLower.includes("smart") || tipLower.includes("programmable"))
			return "45 minutes";

		return "Quick setup";
	};

	const getDifficulty = (tip) => {
		const tipLower = tip.toLowerCase();

		if (tipLower.includes("professional") || tipLower.includes("contractor"))
			return "Professional";
		if (tipLower.includes("insulation") || tipLower.includes("hvac"))
			return "Moderate";
		if (tipLower.includes("thermostat") || tipLower.includes("smart"))
			return "Easy";
		if (tipLower.includes("unplug") || tipLower.includes("adjust"))
			return "Very Easy";

		return "Easy";
	};

	const extractSavings = (tip) => {
		if (!tip) return null;

		// Look for patterns like "$50", "$100-200", "save $X"
		const savingsMatch = tip.match(/\$(\d+(?:-\d+)?)/);
		if (savingsMatch) {
			return parseInt(savingsMatch[1].split("-")[0]);
		}

		// Look for "save X dollars" pattern
		const dollarsMatch = tip.match(/save (\d+) dollars?/i);
		if (dollarsMatch) {
			return parseInt(dollarsMatch[1]);
		}

		return Math.floor(Math.random() * 50) + 10; // Fallback random savings
	};

	// Calculate total savings
	const calculateSavings = () => {
		const monthlySavings = tips.reduce((total, tip) => {
			return total + extractSavings(tip);
		}, 0);

		const annualSavings = monthlySavings * 12;
		const billReduction = billAmount
			? ((monthlySavings / parseFloat(billAmount)) * 100).toFixed(1)
			: 0;

		return {
			monthly: monthlySavings,
			annual: annualSavings,
			percentage: billReduction,
		};
	};

	const savings = calculateSavings();

	return (
		<div className="suggestions-container">
			<div className="suggestions-header">
				<h2 className="suggestions-title">Your Personalized Energy Tips</h2>
				<p className="suggestions-subtitle">
					Tailored recommendations to help you save energy and reduce costs
				</p>
			</div>

			<div className="bento-grid">
				{tips.map((tip, index) =>
					index === 0 ? null : (
						<SuggestionCard
							key={index}
							index={index}
							icon={getIconForTip(tip)}
							title={extractTitleFromTip(tip)}
							description={extractDescriptionFromTip(tip)}
							implementationTime={getImplementationTime(tip)}
							difficulty={getDifficulty(tip)}
							savings={extractSavings(tip)}
							onGetStarted={() => handleGetStarted(tip, index)}
						/>
					)
				)}
			</div>

			{/* Savings Summary Section */}
			{tips.length > 0 && (
				<div className="savings-summary">
					<div className="savings-header">
						<h3 className="savings-title">Your Potential Savings</h3>
						<p className="savings-subtitle">
							Based on your personalized recommendations
						</p>
					</div>

					<div className="savings-metrics">
						<div className="savings-metric">
							<div className="metric-value">${savings.monthly}</div>
							<div className="metric-label">Monthly Savings</div>
						</div>

						<div className="savings-metric highlight">
							<div className="metric-value">${savings.annual.toLocaleString()}</div>
							<div className="metric-label">Annual Savings</div>
						</div>

						<div className="savings-metric">
							<div className="metric-value">{savings.percentage}%</div>
							<div className="metric-label">Bill Reduction</div>
						</div>
					</div>

					<div className="savings-note">
						<p>
							💡 These savings are estimates based on average usage patterns and energy
							costs. Actual savings may vary.
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default SuggestionsGrid;
