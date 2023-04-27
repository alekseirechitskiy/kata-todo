import React, { Component } from "react";
import "./Task.css";

export default class Task extends Component {
	state = {
		done: false,
	};

	render() {
		const { text, onDeleted } = this.props;
		const { done } = this.state;
		let classNames = "";

		if (done) {
			classNames = "completed";
		}

		const toggleStatus = () => {
			this.setState(({ done }) => {
				return {
					done: !done,
				};
			});
		};

		return (
			<li className={classNames}>
				<div className="view">
					<input onClick={toggleStatus} className="toggle" type="checkbox" />
					<label>
						<span className="description">{text}</span>
						<span className="created">created 17 seconds ago</span>
					</label>
					<button className="icon icon-edit"></button>
					<button className="icon icon-destroy" onClick={onDeleted}></button>
				</div>
			</li>
		);
	}
}
