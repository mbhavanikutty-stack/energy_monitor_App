import React from "react";
import ReactMarkdown from "react-markdown";
import "./SuggestionCard.css";

const SuggestionCard = ({
	icon,
	title,
	description,
	savings,
	implementationTime,
	difficulty,
	onGetStarted,
}) => {
	// Parse savings from description if not provided separately
	const parsedSavings = savings || extractSavings(description);

	return (
		<div className="suggestion-card">
			<div className="card-header">
				<div className="card-icon">{icon || "💡"}</div>
				{parsedSavings && (
					<div className="savings-badge">Save ${parsedSavings}</div>
				)}
			</div>

			<div className="card-content">
				<h3 className="card-title">
					<ReactMarkdown>{title}</ReactMarkdown>
				</h3>
				<div className="card-description">
					<ReactMarkdown>{description}</ReactMarkdown>
				</div>
			</div>

			<div className="card-footer">
				<div className="card-details">
					<div className="detail-item">
						<span className="detail-icon">⏱️</span>
						<span className="detail-text">{implementationTime || "Quick setup"}</span>
					</div>
					{difficulty && (
						<div className="detail-item">
							<span className="detail-icon">📊</span>
							<span className="detail-text">{difficulty}</span>
						</div>
					)}
				</div>

				<button
					className="get-started-btn"
					onClick={onGetStarted}
					aria-label={`Get started with ${title}`}
				>
					Get Started
				</button>
			</div>
		</div>
	);
};

// Helper function to extract savings from tip text
const extractSavings = (text) => {
	if (!text) return null;

	// Look for patterns like "$50", "$100-200", "save $X"
	const savingsMatch = text.match(/\$(\d+(?:-\d+)?)/);
	if (savingsMatch) {
		return savingsMatch[1];
	}

	// Look for "save X dollars" pattern
	const dollarsMatch = text.match(/save (\d+) dollars?/i);
	if (dollarsMatch) {
		return dollarsMatch[1];
	}

	return null;
};

// Helper function to extract title from tip text
export const extractTitleFromTip = (tip) => {
	if (!tip) return "Energy Saving Tip";

	// Split by colon and take the first part as title
	const colonIndex = tip.indexOf(":");
	if (colonIndex > 0 && colonIndex < 50) {
		return tip.substring(0, colonIndex).trim();
	}

	// If no colon, take first sentence or first 50 characters
	const sentences = tip.split(/[.!?]/);
	if (sentences[0] && sentences[0].length < 60) {
		return sentences[0].trim();
	}

	return tip.substring(0, 50).trim() + "...";
};

// Helper function to extract description from tip text
export const extractDescriptionFromTip = (tip) => {
	if (!tip) return "";

	// Remove the title part if there's a colon
	const colonIndex = tip.indexOf(":");
	if (colonIndex > 0 && colonIndex < 50) {
		return tip.substring(colonIndex + 1).trim();
	}

	return tip;
};

// Helper function to get appropriate icon based on tip content
export const getIconForTip = (tip) => {
	const tipLower = tip.toLowerCase();

	if (tipLower.includes("led") || tipLower.includes("light")) return "💡";
	if (tipLower.includes("thermostat") || tipLower.includes("temperature"))
		return "🌡️";
	if (tipLower.includes("dishwasher") || tipLower.includes("wash")) return "🍽️";
	if (tipLower.includes("water") || tipLower.includes("shower")) return "🚿";
	if (tipLower.includes("appliance") || tipLower.includes("unplug")) return "🔌";
	if (tipLower.includes("insulation") || tipLower.includes("seal")) return "🏠";
	if (tipLower.includes("solar") || tipLower.includes("renewable")) return "☀️";
	if (tipLower.includes("air") || tipLower.includes("hvac")) return "❄️";
	if (tipLower.includes("smart") || tipLower.includes("automation")) return "📱";
	if (tipLower.includes("energy") || tipLower.includes("efficient")) return "⚡";

	return "💡"; // Default icon
};

export default SuggestionCard;
