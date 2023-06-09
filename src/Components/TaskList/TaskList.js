import React from 'react';

import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ todos, onDeleted, onEdited, editTask, onTextCange, onToggleDone }) => {
  const tasks = todos.map(({ id, ...other }) => {
    return (
      <Task
        key={id}
        {...other}
        onTextCange={onTextCange}
        editTask={() => editTask()}
        onEdited={() => onEdited(id)}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    );
  });

  return <ul className="todo-list">{tasks}</ul>;
};

export default TaskList;
