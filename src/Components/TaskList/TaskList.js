import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

const TaskList = ({ todos, onDeleted }) => {
	const tasks = todos.map(({ id, ...other }) => {
		return <Task key={id} {...other} onDeleted={() => onDeleted(id)} />;
	});

	return <ul className="todo-list">{tasks}</ul>;
};

export default TaskList;
