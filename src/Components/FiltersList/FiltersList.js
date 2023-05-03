import React from "react";
import "./FiltersList.css";

const FiltersList = ({ onAllClick, onActiveClick, onCompletedClick }) => {
	const toggleClass = (e) => {
		const selectedElement = document.querySelector(".selected");
		selectedElement.classList.remove("selected");
		e.target.classList.add("selected");
	};

	return (
		<ul className="filters" onClick={toggleClass}>
			<li>
				<button className="selected" onClick={onAllClick}>
					All
				</button>
			</li>
			<li>
				<button onClick={onActiveClick}>Active</button>
			</li>
			<li>
				<button onClick={onCompletedClick}>Completed</button>
			</li>
		</ul>
	);
};

export default FiltersList;
