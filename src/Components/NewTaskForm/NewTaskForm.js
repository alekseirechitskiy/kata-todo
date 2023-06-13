import React, { useState } from 'react';
import './NewTaskForm.css';

const NewTaskForm = (props) => {
  const [taskData, setTaskData] = useState({ text: '', mins: '', secs: '' });

  const onTextCange = (evt) => {
    setTaskData({ ...taskData, text: evt.target.value });
  };

  const onMinsCange = (evt) => {
    setTaskData({ ...taskData, mins: evt.target.value });
  };

  const onSecsCange = (evt) => {
    setTaskData({ ...taskData, secs: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    props.onItemAdded(taskData.text, taskData.mins, taskData.secs);
    setTaskData({ text: '', mins: '', secs: '' });
  };

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onTextCange}
        value={taskData.text}
      />
      <input
        className="new-todo-form__timer"
        onChange={onMinsCange}
        value={taskData.mins}
        placeholder="Min"
        onClick={props.startTimer}
        type="number"
        min={0}
      />
      <input
        className="new-todo-form__timer"
        onChange={onSecsCange}
        value={taskData.secs}
        placeholder="Sec"
        type="number"
        min={0}
        max={59}
      />
      <input type="submit" hidden />
    </form>
  );
};

export default NewTaskForm;
