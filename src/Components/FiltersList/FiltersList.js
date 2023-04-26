import React, { Component } from "react";
import "./FiltersList.css";

export default class FiltersList extends Component {
	render() {
		return (
			<ul className="filters">
				<li>
					<button className="selected">All</button>
				</li>
				<li>
					<button>Active</button>
				</li>
				<li>
					<button>Completed</button>
				</li>
			</ul>
		);
	}
}

// const FiltersListFn = () => {
// 	return (
// 		<ul className="filters">
// 			<li>
// 				<button className="selected">All</button>
// 			</li>
// 			<li>
// 				<button>Active</button>
// 			</li>
// 			<li>
// 				<button>Completed</button>
// 			</li>
// 		</ul>
// 	);
// };

// export default FiltersList;
