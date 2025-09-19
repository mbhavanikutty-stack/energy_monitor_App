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

	// Calculate total savings from parsed JSON tips
	const extractNumericSavings = (potentialSavings) => {
		if (!potentialSavings) return 0;
		// Try to extract the first number from the string (e.g., "$50–$100 per year")
		const match = potentialSavings.match(/\$(\d+)/);
		return match ? parseInt(match[1], 10) : 0;
	};

	const calculateSavings = () => {
		const monthlySavings = tips.reduce((total, tip) => {
			return total + extractNumericSavings(tip.potentialSavings);
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
							icon={tip.icon}
							title={tip.title}
							description={tip.description}
							implementationTime={tip.timeToImplement}
							difficulty={tip.difficulty}
							savings={tip.potentialSavings}
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
