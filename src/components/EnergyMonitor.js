// src/components/EnergyMonitor.js
import React, { useMemo, useState } from "react";
import "./EnergyMonitor.css";
import MultiSelect from "./MultiSelect";

//const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

/*
Common Household Appliances:
  Air Conditioner
  Refrigerator
  Freezer
  Washing Machine
  Clothes Dryer
  Dishwasher
  Oven
  Microwave Oven
  Toaster
  Blender
  Coffee Maker
  Vacuum Cleaner
  Iron
  Hairdryer
  Thermostat
  Television
  Ceiling Fan
  Water Heater
  Slow Cooker
  Air Fryer
  Mixer / Stand Mixer
  Food Processor
  Electric Grill
  Kettle
  Rice Cooker
  Dehumidifier
  Electric Blanket
  Electric Fireplace
  Pool Pump
  Dishwasher
  Food Waste Disposer
  Electric Tools (Drill, Saw, Impact Driver, etc.)
  Wi-Fi Router
  Doorbell (Smart Doorbell)
*/

const appliances = [
	{ id: 1, name: "Air Conditioner" },
	{ id: 2, name: "Refrigerator" },
	{ id: 3, name: "Washing Machine" },
	{ id: 4, name: "Dryer" },
	{ id: 5, name: "Dishwasher" },
	{ id: 6, name: "Oven" },
	{ id: 7, name: "Microwave" },
	{ id: 8, name: "Television" },
	{ id: 9, name: "Computer" },
	{ id: 10, name: "Lighting" },
	{ id: 11, name: "Water Heater" },
	{ id: 12, name: "Ceiling Fan" },
	{ id: 13, name: "Coffee Maker" },
	{ id: 14, name: "Toaster" },
	{ id: 15, name: "Vacuum Cleaner" },
	{ id: 16, name: "Iron" },
	{ id: 17, name: "Hairdryer" },
	{ id: 18, name: "Thermostat" },
	{ id: 19, name: "Slow Cooker" },
	{ id: 20, name: "Air Fryer" },
	{ id: 21, name: "Mixer" },
	{ id: 22, name: "Food Processor" },
	{ id: 23, name: "Electric Grill" },
	{ id: 24, name: "Kettle" },
	{ id: 25, name: "Rice Cooker" },
	{ id: 26, name: "Dehumidifier" },
	{ id: 27, name: "Electric Blanket" },
	{ id: 28, name: "Electric Fireplace" },
	{ id: 29, name: "Pool Pump" },
	{ id: 30, name: "Food Waste Disposer" },
	{ id: 31, name: "Electric Tools" },
	{ id: 32, name: "Wi-Fi Router" },
	{ id: 33, name: "Smart Doorbell" },
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

	const fetchEnergyTips = async () => {
		const newErrors = {};
		if (!billAmount) newErrors.billAmount = "Required";
		if (!householdSize) newErrors.householdSize = "Required";
		setErrors(newErrors);
		if (Object.keys(newErrors).length > 0) return;

		setLoading(true);
		const prompt = `The user's household has ${householdSize} people and a monthly energy bill of $${billAmount}. The user has the following appliances: ${selectedAppliances}, and is located in ${location}, ${country}. Generate 5 actionable and personalized tips to help them reduce their energy consumption based on these inputs. For each tip, provide a very rough estimate of the potential annual savings in dollars. Use a bulleted list.`;

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
			setTips(parsedTips);
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
		return loading || !billAmount || !householdSize;
	}, [loading, billAmount, householdSize]);

	return (
		<div className="energy-monitor-container">
			<h1>Home Energy Monitor ⚡️</h1>
			<p className="subtitle">
				Get quick, personalized tips to lower your electricity bill.
			</p>
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
						/>
						<small className="helper-text">Number of people living at home.</small>
						{errors.householdSize && (
							<div className="error-text">{errors.householdSize}</div>
						)}
					</div>

					<div className="form-field">
						<label htmlFor="city">City</label>
						<input
							id="city"
							placeholder="e.g. Austin"
							value={location}
							onChange={(e) => setLocation(e.target.value)}
						/>
						<small className="helper-text">
							Optional, helps personalize climate‑related tips.
						</small>
					</div>

					<div className="form-field">
						<label htmlFor="country">Country</label>
						<input
							id="country"
							placeholder="e.g. USA"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
					</div>
				</div>

				<div className="form-field">
					<label htmlFor="appliances">Appliances</label>
					<MultiSelect
						id="appliances"
						options={appliances.map((a) => ({
							id: a.id,
							name: a.name,
							value: a.name,
						}))}
						value={selectedAppliances}
						onChange={setSelectedAppliances}
						placeholder="Search for appliances"
					/>
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
				<div className="tips-list card">
					<h2>Your personalized tips</h2>
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
