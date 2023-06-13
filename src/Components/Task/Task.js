import React, { useEffect } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

const Task = ({
  text,
  onStartTimer,
  onStopTimer,
  onDeleted,
  onEdited,
  onTextCange,
  onToggleDone,
  done,
  editing,
  hidden,
  date,
  duration,
  id,
  editTask,
  deleteTaskTimer,
}) => {
  useEffect(() => {
    return deleteTimer();
  }, []);

  const onSubmit = (evt) => {
    evt.preventDefault();
    editTask();
  };

  const deleteTimer = () => {
    deleteTaskTimer();
  };

  const timeConvertor = (number) => {
    const hours = Math.floor(number / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor(number / 60 - hours * 60)
      .toString()
      .padStart(2, '0');
    const seconds = (number % 60).toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  };

  let classNames = '';

  if (done) {
    classNames = 'completed';
  }

  if (editing) {
    classNames = 'editing';
  }

  if (hidden) {
    classNames = 'hidden';
  }

  return (
    <li className={classNames}>
      <div className="view">
        <input id={`task-${id}`} onClick={onToggleDone} className="toggle" type="checkbox" />
        <label htmlFor={`task-${id}`}>
          <span className="title">{text}</span>
          <span className="description">
            <button className="icon icon-play" onClick={onStartTimer}></button>
            <button className="icon icon-pause" onClick={onStopTimer}></button>
            {timeConvertor(duration)}
          </span>
          <span className="description">
            {formatDistanceToNow(date, {
              addSuffix: true,
              includeSeconds: true,
            })}
          </span>
        </label>
        <button type="button" className="icon icon-edit" onClick={onEdited}></button>
        <button type="button" className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" className="edit" onChange={onTextCange} value={text}></input>
      </form>
    </li>
  );
};

export default Task;
