// src/components/EnergyMonitor.js
import React, { useMemo, useState } from "react";
import "./EnergyMonitor.css";
import MultiSelect from "./MultiSelect";
import SuggestionsGrid from "./SuggestionsGrid";
import { parseSuggestions } from "../utils/parseSuggestions";

const appliances = [
	// Kitchen
	{ id: 5, name: "Dishwasher", category: "Kitchen" },
	{ id: 6, name: "Oven", category: "Kitchen" },
	{ id: 7, name: "Microwave", category: "Kitchen" },
	{ id: 13, name: "Coffee Maker", category: "Kitchen" },
	{ id: 14, name: "Toaster", category: "Kitchen" },
	{ id: 19, name: "Slow Cooker", category: "Kitchen" },
	{ id: 20, name: "Air Fryer", category: "Kitchen" },
	{ id: 21, name: "Mixer", category: "Kitchen" },
	{ id: 22, name: "Food Processor", category: "Kitchen" },
	{ id: 23, name: "Electric Grill", category: "Kitchen" },
	{ id: 24, name: "Kettle", category: "Kitchen" },
	{ id: 25, name: "Rice Cooker", category: "Kitchen" },
	{ id: 30, name: "Food Waste Disposer", category: "Kitchen" },

	// Living Room
	{ id: 8, name: "Television", category: "Living Room" },
	{ id: 28, name: "Electric Fireplace", category: "Living Room" },
	{ id: 32, name: "Wi-Fi Router", category: "Living Room" },
	{ id: 33, name: "Smart Doorbell", category: "Living Room" },

	// Laundry
	{ id: 3, name: "Washing Machine", category: "Laundry" },
	{ id: 4, name: "Dryer", category: "Laundry" },
	{ id: 15, name: "Vacuum Cleaner", category: "Laundry" },
	{ id: 16, name: "Iron", category: "Laundry" },

	// Bedroom
	{ id: 27, name: "Electric Blanket", category: "Bedroom" },
	{ id: 12, name: "Ceiling Fan", category: "Bedroom" },

	// Bathroom
	{ id: 11, name: "Water Heater", category: "Bathroom" },
	{ id: 17, name: "Hairdryer", category: "Bathroom" },

	// Office/Study
	{ id: 9, name: "Computer", category: "Office/Study" },

	// Climate
	{ id: 1, name: "Air Conditioner", category: "Climate" },
	{ id: 18, name: "Thermostat", category: "Climate" },
	{ id: 26, name: "Dehumidifier", category: "Climate" },

	// Outdoor/Utility
	{ id: 29, name: "Pool Pump", category: "Outdoor/Utility" },
	{ id: 31, name: "Electric Tools", category: "Outdoor/Utility" },

	// General
	{ id: 2, name: "Refrigerator", category: "General" },
	{ id: 10, name: "Lighting", category: "General" },
];

const EnergyMonitor = () => {
	const [billAmount, setBillAmount] = useState("");
	const [householdSize, setHouseholdSize] = useState("");
	const [location, setLocation] = useState("");
	const [country, setCountry] = useState("");
	const [tips, setTips] = useState([]);
	const [loading, setLoading] = useState(false);
	const [selectedAppliances, setSelectedAppliances] = useState([]);
	const [errors, setErrors] = useState({});
	const [selectedCategory, setSelectedCategory] = useState("All");

	// Unique categories for dropdown (Task 1)
	const categories = useMemo(() => {
		const unique = Array.from(new Set(appliances.map((a) => a.category))).sort(
			(a, b) => a.localeCompare(b)
		);
		return ["All", ...unique];
	}, []);

	// Filter appliances by selected category (Task 3)
	const filteredAppliances = useMemo(() => {
		if (selectedCategory === "All") return appliances;
		return appliances.filter((a) => a.category === selectedCategory);
	}, [selectedCategory]);

	const fetchEnergyTips = async () => {
		const newErrors = {};
		if (!billAmount) newErrors.billAmount = "Required";
		if (!householdSize) newErrors.householdSize = "Required";
		if (!location) newErrors.location = "Required";
		if (!country) newErrors.country = "Required";
		if (selectedAppliances.length === 0) newErrors.appliances = "Required";
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		setLoading(true);
		const prompt = `The user's household has ${householdSize} people and a monthly energy bill of ${billAmount}. 
						The user has the following appliances: ${selectedAppliances}, and is located in ${location}, ${country}. 

						Based on these inputs, generate at least 5 actionable and personalized energy-saving suggestions. 
						For each suggestion, provide the following details in a clear and structured format:

						- Title (a short, catchy title for the suggestion with a related emoji at the start)  
						- Potential Annual Savings (a very rough estimate in US dollars, e.g. "$50–$100 per year")  
						- Difficulty (rate as Easy, Medium, or Hard, based on effort and cost)  
						- Time to Implement (rough amount of time, e.g. "a few minutes," "1–2 days," etc.)  
						- Description (1–2 sentences explaining the action clearly)

						Return the answers as a bulleted list, where each bullet represents one suggestion with all fields included.
						`;

		try {
			const response = await fetch(
				"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyDCNdgSlVc14RHYzzAFh6ipaHtqilzoDhw",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						contents: [{ parts: [{ text: prompt }] }],
					}),
				}
			);

			if (!response.ok) {
				throw new Error("API request failed");
			}

			const data = await response.json();
			const generatedText = data.candidates[0].content.parts[0].text;
			const parsedTips = generatedText
				.split(/\n\*\s?/)
				.filter((tip) => tip.trim() !== "");
			const parsedJson = parseSuggestions(parsedTips);
			setTips(parsedJson);
			console.log(parsedJson);
		} catch (error) {
			console.error("Error fetching data:", error);
			alert(
				"Failed to get energy-saving tips. Please check your API key and try again."
			);
		} finally {
			setLoading(false);
		}
	};

	const isSubmitDisabled = useMemo(() => {
		return (
			loading ||
			!billAmount ||
			!householdSize ||
			!location ||
			!country ||
			selectedAppliances.length === 0
		);
	}, [
		loading,
		billAmount,
		householdSize,
		location,
		country,
		selectedAppliances,
	]);

	return (
		<div className="energy-monitor-container">
			<div className="header-section">
				<h1>Home Energy Monitor ⚡️</h1>
				<p className="subtitle">
					Get quick, personalized tips to lower your electricity bill.
				</p>
			</div>
			<div className="input-form card">
				<div className="form-grid">
					<div className={`form-field ${errors.billAmount ? "has-error" : ""}`}>
						<label htmlFor="billAmount">Monthly bill ($)</label>
						<input
							id="billAmount"
							type="number"
							min="0"
							placeholder="e.g. 120"
							value={billAmount}
							onChange={(e) => setBillAmount(e.target.value)}
							aria-invalid={!!errors.billAmount}
							aria-describedby="billAmountHelp"
							autoComplete="billing cc-number"
						/>
						<small id="billAmountHelp" className="helper-text">
							Approximate latest monthly total.
						</small>
						{errors.billAmount && (
							<div className="error-text">{errors.billAmount}</div>
						)}
					</div>

					<div className={`form-field ${errors.householdSize ? "has-error" : ""}`}>
						<label htmlFor="householdSize">Household size</label>
						<input
							id="householdSize"
							type="number"
							min="1"
							placeholder="e.g. 3"
							value={householdSize}
							onChange={(e) => setHouseholdSize(e.target.value)}
							aria-invalid={!!errors.householdSize}
							autoComplete="cc-number"
						/>
						<small className="helper-text">Number of people living at home.</small>
						{errors.householdSize && (
							<div className="error-text">{errors.householdSize}</div>
						)}
					</div>

					<div className={`form-field ${errors.location ? "has-error" : ""}`}>
						<label htmlFor="city">City</label>
						<input
							id="city"
							placeholder="e.g. Austin"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
							aria-invalid={!!errors.location}
						/>
						<small className="helper-text">
							Helps personalize climate‑related tips.
						</small>
						{errors.location && <div className="error-text">{errors.location}</div>}
					</div>

					<div className={`form-field ${errors.country ? "has-error" : ""}`}>
						<label htmlFor="country">Country</label>
						<input
							id="country"
							placeholder="e.g. USA"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
							aria-invalid={!!errors.country}
							autoComplete="country"
						/>
						{errors.country && <div className="error-text">{errors.country}</div>}
					</div>
				</div>

				{/* Category and Appliances side by side */}
				<div className="appliances-row">
					<div className="form-field">
						<label htmlFor="category">Category</label>
						<select
							id="category"
							className="dropdown-button"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							{categories.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
						<small className="helper-text">Filter appliances by room/type.</small>
					</div>

					<div className={`form-field ${errors.appliances ? "has-error" : ""}`}>
						<label htmlFor="appliances">Appliances</label>

						<MultiSelect
							id="appliances"
							options={filteredAppliances.map((a) => ({
								id: a.id,
								name: a.name,
								value: a.name,
							}))}
							value={selectedAppliances}
							onChange={setSelectedAppliances}
						/>
						<small className="helper-text">
							Showing {filteredAppliances.length} of {appliances.length} appliances
							{selectedCategory !== "All" ? ` in ${selectedCategory}` : ""}.
						</small>
						{errors.appliances && (
							<div className="error-text">{errors.appliances}</div>
						)}
					</div>
				</div>

				<div>
					{/* Selected appliances tags */}
					{selectedAppliances.length > 0 && (
						<div className="selected-appliances-tags">
							{selectedAppliances.map((appliance) => (
								<span key={appliance} className="appliance-tag">
									{appliance}
									<button
										type="button"
										className="tag-remove"
										onClick={() =>
											setSelectedAppliances((prev) => prev.filter((a) => a !== appliance))
										}
										aria-label={`Remove ${appliance}`}
									>
										×
									</button>
								</span>
							))}
						</div>
					)}
				</div>

				<div className="actions">
					<button
						className="primary"
						onClick={fetchEnergyTips}
						disabled={isSubmitDisabled}
					>
						{loading ? "Generating…" : "Get my tips"}
					</button>
				</div>
			</div>

			{tips.length === 0 && (
				<div className="empty-state">
					<p>
						Enter your details and select appliances to get tailored suggestions.
					</p>
				</div>
			)}

			{tips.length > 0 && (
				<SuggestionsGrid
					tips={tips}
					billAmount={billAmount}
					onGetStarted={(tip, index) => {
						// Handle get started action - could open modal, navigate, etc.
						console.log(`Getting started with tip ${index + 1}:`, tip);
					}}
				/>
			)}
		</div>
	);
};

export default EnergyMonitor;
