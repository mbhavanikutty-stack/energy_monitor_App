// utils/parseSuggestions.js
// Utility to transform markdown-like suggestion strings into structured JSON objects

/**
 * Parses an array of markdown-like suggestion strings into structured JSON objects.
 * @param {string[]} markdownArray - Array of suggestion strings in markdown-like format.
 * @returns {Array<{title: string, potentialSavings: string, difficulty: string, timeToImplement: string, description: string}>}
 */
export function parseSuggestions(markdownArray) {
	return markdownArray.map((md) => {
		// Extract title (first line, emoji + bold)
		const titleMatch = md.match(/^(.+?)\n/);
		const title = titleMatch ? titleMatch[1].replace(/\*\*/g, "").trim() : "";

		// Extract attributes
		const potentialSavings =
			md.match(/\*\*Potential Annual Savings:\*\*\s*([^\n]+)/i)?.[1].trim() || "";
		const difficulty =
			md.match(/\*\*Difficulty:\*\*\s*([^\n]+)/i)?.[1].trim() || "";
		const timeToImplement =
			md.match(/\*\*Time to Implement:\*\*\s*([^\n]+)/i)?.[1].trim() || "";
		const description =
			md.match(/\*\*Description:\*\*\s*([^\n]+)/i)?.[1].trim() || "";

		return {
			title,
			potentialSavings,
			difficulty,
			timeToImplement,
			description,
		};
	});
}
