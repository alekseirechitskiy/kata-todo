import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.editTask();
  };

  // cancel = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  //   if (e.keyCode === 27) {
  //     this.props.onEscPress();
  //   }
  // };

  // componentDidMount() {
  //   document.addEventListener('keyup', this.cancel, false);
  // }
  // componentWillUnmount() {
  //   document.removeEventListener('keyup', this.cancel, false);
  // }

  render() {
    const { text, onDeleted, onEdited, onTextCange, onToggleDone, done, editing, hidden, date, id } = this.props;
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
          <input
            onKeyUp={this.cancel}
            autoFocus
            id={`task-${id}`}
            onClick={onToggleDone}
            className="toggle"
            type="checkbox"
          />
          <label htmlFor={`task-${id}`}>
            <span className="title">{text}</span>
            <span className="description">
              <button className="icon icon-play"></button>
              <button className="icon icon-pause"></button>
              12:25
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
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" onChange={onTextCange} value={text}></input>
        </form>
      </li>
    );
  }
}

{
  /* <span className="description">{text}</span>
            <span className="timer-box created">
              <button className="icon icon-play" type="button"></button>
              <button className="icon icon-pause" type="button"></button>
              12:25
            </span>
            <span className="created">
              {formatDistanceToNow(date, {
                addSuffix: true,
                includeSeconds: true,
              })}
            </span> */
}

{
  /* <li className={classNames}>
  <div className="view">
    <input onClick={onToggleDone} className="toggle" type="checkbox" />
    <label>
      <span className="description">{text}</span>
      <span className="created">
        {formatDistanceToNow(date, {
          addSuffix: true,
          includeSeconds: true,
        })}
      </span>
    </label>
    <button className="icon icon-edit" onClick={onEdited}></button>
    <button className="icon icon-destroy" onClick={onDeleted}></button>
  </div>
  <form onSubmit={this.onSubmit}>
    <input type="text" className="edit" onChange={onTextCange} autoFocus value={text}></input>
  </form>
</li>; */
}
