import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({ todos }) => {
	const tasks = todos.map(({ id, status, ...other }) => {
		return (
			<li className={status} key={id}>
				<Task {...other} />
			</li>
		);
	});

	return <ul className="todo-list">{tasks}</ul>;
};

export default TaskList;
