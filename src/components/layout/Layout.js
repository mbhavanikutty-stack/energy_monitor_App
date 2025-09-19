import React from "react";
import { Outlet } from "react-router-dom";
import DesktopNav from "../navigation/DesktopNav";
import MobileNav from "../navigation/MobileNav";
import "./Layout.css";

const Layout = () => {
	return (
		<div className="site mobile-container">
			<header className="site-header">
				<DesktopNav />
				<MobileNav />
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
