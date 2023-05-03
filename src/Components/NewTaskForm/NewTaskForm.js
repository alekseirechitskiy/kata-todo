import React, { Component } from "react";
import "./NewTaskForm.css";

export default class NewTaskForm extends Component {
	state = {
		text: "",
	};

	onTextCange = (evt) => {
		this.setState({
			text: evt.target.value,
		});
	};

	onSubmit = (evt) => {
		evt.preventDefault();
		this.props.onItemAdded(this.state.text);
		this.setState({
			text: "",
		});
	};

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<input
					className="new-todo"
					placeholder="What needs to be done?"
					autoFocus
					onChange={this.onTextCange}
					value={this.state.text}
				/>
			</form>
		);
	}
}
