import React, { useState } from "react";

const Contact = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [sent, setSent] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setSent(true);
	};

	const [firstName] = name.split(" ");

	return (
		<div className="energy-monitor-container">
			<h1>Contact Us</h1>
			<p className="subtitle">
				We’d love to hear from you. Send a note and we’ll reply soon.
			</p>

			{!sent && (
				<form className="card" onSubmit={onSubmit}>
					<div className="form-grid">
						<div className="form-field">
							<label>Name</label>
							<input
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="First Last"
							/>
						</div>
						<div className="form-field">
							<label>Email</label>
							<input
								type="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								placeholder="you@example.com"
							/>
						</div>
						<div className="form-field">
							<label>Contact Number (optional)</label>
							<input
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								placeholder="+1 555 555 5555"
							/>
						</div>
					</div>
					<div className="actions">
						<button className="primary" type="submit">
							Send
						</button>
					</div>
				</form>
			)}

			{sent && (
				<div className="card">
					<h2>Thanks, {firstName || "friend"}!</h2>
					<p className="subtitle">
						Your message has been received. We’ll be in touch at{" "}
						{email || "your email"}.
					</p>
					<h3 style={{ marginTop: 16 }}>Your confirmation email</h3>
					<div
						style={{
							background: "#f8fafc",
							border: "1px solid #e2e8f0",
							borderRadius: 8,
							padding: 16,
						}}
					>
						<p>Subject: Welcome to Energy Saver</p>
						<p>Hi {firstName || "there"},</p>
						<p>
							Thanks for reaching out to Energy Saver. A member of our team will reply
							shortly. In the meantime, you can start exploring personalized tips on
							the Suggestions page.
						</p>
						<p>
							Stay efficient,
							<br />
							The Energy Saver Team
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Contact;
