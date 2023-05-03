import React, { Component } from "react";
import "./Task.css";

export default class Task extends Component {
	render() {
		const { text, onDeleted, onToggleDone, done, hidden } = this.props;
		let classNames = "";

		if (done) {
			classNames = "completed";
		}

		if (hidden) {
			classNames = "hidden";
		}

		return (
			<li className={classNames}>
				<div className="view">
					<input onClick={onToggleDone} className="toggle" type="checkbox" />
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
