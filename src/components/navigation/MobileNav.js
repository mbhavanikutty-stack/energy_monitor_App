import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

import "./NavGlossy.css";

const MobileNav = () => {
	const { isDarkMode, toggleTheme } = useTheme();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<div className="mobile-nav">
			<div className="mobile-nav-container">
				<Link to="/" className="brand" onClick={closeMenu}>
					<img src="/logo192.png" alt="EcoSense" className="brand-logo" />
					<span className="brand-text">EcoSense</span>
				</Link>

				<div className="mobile-nav-right">
					<button
						onClick={toggleTheme}
						className="theme-toggle-nav mobile"
						aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
					>
						{isDarkMode ? "☀️" : "🌙"}
					</button>

					<button
						className="hamburger-menu"
						onClick={toggleMenu}
						aria-label="Toggle navigation menu"
					>
						<span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
						<span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
						<span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
					</button>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`mobile-menu-overlay ${isMenuOpen ? "open" : ""}`}
				onClick={closeMenu}
			></div>

			{/* Mobile Menu */}
			<div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
				<div className="mobile-menu-header">
					<h3>Navigation</h3>
					<button
						className="close-menu-btn"
						onClick={closeMenu}
						aria-label="Close navigation menu"
					>
						×
					</button>
				</div>
				<nav className="mobile-nav-links">
					<NavLink
						to="/"
						end
						className={({ isActive }) =>
							isActive ? "mobile-nav-link active" : "mobile-nav-link"
						}
						onClick={closeMenu}
					>
						Home
					</NavLink>
					<NavLink
						to="/suggest"
						className={({ isActive }) =>
							isActive ? "mobile-nav-link active" : "mobile-nav-link"
						}
						onClick={closeMenu}
					>
						Suggestions
					</NavLink>
					<NavLink
						to="/contact"
						className={({ isActive }) =>
							isActive ? "mobile-nav-link active" : "mobile-nav-link"
						}
						onClick={closeMenu}
					>
						Contact
					</NavLink>
				</nav>
			</div>
		</div>
	);
};

export default MobileNav;
