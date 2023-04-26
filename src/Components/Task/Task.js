import React, { Component } from "react";
import "./Task.css";

export default class Task extends Component {
	state = {};

	render() {
		const { text } = this.props;

		return (
			<div className="view">
				<input className="toggle" type="checkbox" />
				<label>
					<span className="description">{text}</span>
					<span className="created">created 17 seconds ago</span>
				</label>
				<button className="icon icon-edit"></button>
				<button className="icon icon-destroy"></button>
			</div>
		);
	}
}

// const Task = (props) => {
// 	return (
// 		<div className="view">
// 			<input className="toggle" type="checkbox" />
// 			<label>
// 				<span className="description">{props.text}</span>
// 				<span className="created">created 17 seconds ago</span>
// 			</label>
// 			<button className="icon icon-edit"></button>
// 			<button className="icon icon-destroy"></button>
// 		</div>
// 	);
// };

// export default Task;
