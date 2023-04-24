import React from "react";
import "./Footer.css";
import FiltersList from "../FiltersList";

const Footer = () => {
	return (
		<footer className="footer">
			<span className="todo-count">1 items left</span>
			<FiltersList />
			<button className="clear-completed">Clear completed</button>
		</footer>
	);
};

export default Footer;
