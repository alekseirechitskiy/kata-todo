import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.editTask();
  };

  render() {
    const { text, onDeleted, onEdited, onTextCange, onToggleDone, done, editing, hidden, date } = this.props;
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
      </li>
    );
  }
}
