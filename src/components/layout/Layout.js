import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
	return (
		<div className="site">
			<header className="site-header">
				<div className="container header-inner">
					<Link to="/" className="brand">
						Energy Saver
					</Link>
					<nav className="nav">
						<NavLink to="/" end>
							Home
						</NavLink>
						<NavLink to="/suggest">Suggestions</NavLink>
						<NavLink to="/contact">Contact</NavLink>
					</nav>
				</div>
			</header>

			<main className="container main">
				<Outlet />
			</main>

			<footer className="site-footer">
				<div className="container">
					<p>© {new Date().getFullYear()} Energy Saver. Save smart, live better.</p>
				</div>
			</footer>
		</div>
	);
};

export default Layout;
