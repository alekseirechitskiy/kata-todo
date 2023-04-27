import React, { Component } from "react";

import Header from "../Header/Header";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import "./App.css";

export default class App extends Component {
	state = {
		todoData: [
			{ text: "Learn React", status: "", id: 1, done: false },
			{ text: "Task 1", status: "", id: 2, done: false },
			{ text: "Task 2", status: "", id: 3, done: false },
		],
	};

	deleteItem = (id) => {
		this.setState(({ todoData }) => {
			const idx = todoData.findIndex((el) => el.id === id);
			const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
			return {
				todoData: newArray,
			};
		});
	};

	render() {
		return (
			<section className="todoapp">
				<Header />
				<NewTaskForm />
				<TaskList todos={this.state.todoData} onDeleted={this.deleteItem} />
				<Footer />
			</section>
		);
	}
}
