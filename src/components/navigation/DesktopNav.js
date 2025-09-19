import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

import "./NavGlossy.css";

const DesktopNav = () => {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<div className="desktop-nav">
			<div className="nav-container">
				<Link to="/" className="brand">
					<img src="/logo192.png" alt="Energy Saver" className="brand-logo" />
					<span className="brand-text">Energy Saver</span>
				</Link>

				<div className="nav-center">
					<nav className="nav-links">
						<NavLink
							to="/"
							end
							className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
						>
							Home
						</NavLink>
						<NavLink
							to="/suggest"
							className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
						>
							Suggestions
						</NavLink>
						<NavLink
							to="/contact"
							className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
						>
							Contact
						</NavLink>
					</nav>
				</div>

				<button
					onClick={toggleTheme}
					className="theme-toggle-nav"
					aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
				>
					{isDarkMode ? "☀️" : "🌙"}
				</button>
			</div>
		</div>
	);
};

export default DesktopNav;
