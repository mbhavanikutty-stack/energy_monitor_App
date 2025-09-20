import React from "react";
import "./ContactPage.css";
import { Link } from "react-router-dom";

const ContactPage = () => {
	return (
		<div className="contact-page">
			<div className="contact-left">
				<h1 className="contact-headline">Get in &mdash; touch with us</h1>
				<p className="contact-intro">
					We're here to help! Whether you have a question about your energy analysis,
					need assistance with your account, or want to provide feedback on our
					suggestions, our team is ready to assist you.
				</p>
				<div className="contact-details">
					<div className="contact-detail">
						<span className="contact-label">Email:</span>
						<Link to="support@ecosaver.app" className="email-link">
							support@ecosaver.app
						</Link>
					</div>
					<div className="contact-detail">
						<span className="contact-label">Phone:</span>
						<span>+61 (044) 444-4444</span>
					</div>
					<div className="contact-detail">
						<span className="contact-label">Availability:</span>
						<span>Available Monday to Friday, 9 AM - 5 PM</span>
					</div>
				</div>
				<Link to="/contact">
					<button className="live-chat-button">Live Chat &rarr;</button>
				</Link>
			</div>
			<div className="contact-right">
				<form className="contact-form">
					<div className="form-row">
						<div className="form-group">
							<label htmlFor="first-name">First Name</label>
							<input type="text" id="first-name" placeholder="First Name" />
						</div>
						<div className="form-group">
							<label htmlFor="last-name">Last Name</label>
							<input type="text" id="last-name" placeholder="Last Name" />
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>
						<input type="email" id="email" placeholder="Email" />
					</div>
					<div className="form-group">
						<label htmlFor="message">How can we help you?</label>
						<textarea id="message" placeholder="Your message"></textarea>
					</div>
					<div className="submit-button-container">
						<Link to="/contact">
							<button type="submit" className="send-message-button">
								Send Message &rarr;
							</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ContactPage;
