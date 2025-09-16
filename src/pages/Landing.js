import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
	return (
		<section>
			<div className="energy-monitor-container">
				<h1>Save on your electricity bill</h1>
				<p className="subtitle">
					A fast, personalized tool that turns your household info into practical
					energy‑saving tips.
				</p>
				<div className="card" style={{ marginTop: 12 }}>
					<ul>
						<li>Smart, tailored suggestions for your home</li>
						<li>Works on any device, quick and private</li>
						<li>Actionable tips with estimated annual savings</li>
					</ul>
					<div className="actions">
						<Link
							to="/suggest"
							className="primary"
							style={{ textDecoration: "none", display: "inline-block" }}
						>
							Get Suggestions
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
