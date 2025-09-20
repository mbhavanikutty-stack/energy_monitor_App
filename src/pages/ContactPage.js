import React from "react";
import "./ContactPage.css";

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

						<a href="mailto:support@ecosaver.app" className="email-link">
							support@ecosaver.app
						</a>
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

				<button className="live-chat-button">Live Chat &rarr;</button>
			</div>
			<div className="contact-right">
				<form
					// The action URL should be your unique Formspree endpoint
					action="https://formspree.io/f/mwpngwqp"
					method="POST"
					className="contact-form"
				>
					<div className="form-row">
						<div className="form-group">
							<label htmlFor="first-name">First Name</label>

							<input
								type="text"
								id="first-name"
								name="firstName"
								placeholder="First Name"
							/>
						</div>
						<div className="form-group">
							<label htmlFor="last-name">Last Name</label>

							<input
								type="text"
								id="last-name"
								name="lastName"
								placeholder="Last Name"
							/>
						</div>
					</div>
					<div className="form-group">
						<label htmlFor="email">Email</label>

						<input type="email" id="email" name="email" placeholder="Email" />
					</div>
					<div className="form-group">
						<label htmlFor="message">How can we help you?</label>

						<textarea
							id="message"
							name="message"
							placeholder="Your message"
						></textarea>
					</div>

					{/* THIS IS THE NEW LINE FOR REDIRECTION */}
					<input type="hidden" name="_next" value="/" />

					<div className="submit-button-container">
						<button type="submit" className="send-message-button">
							Send Message &rarr;
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ContactPage;
