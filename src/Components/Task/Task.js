import React, { Component } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

export default class Task extends Component {
  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.editTask();
  };

  deleteTimer = () => {
    this.props.deleteTaskTimer();
  };

  // getPadTime = (time) => {
  //   time.
  // }

  timeConvertor = (number) => {
    console.log(number / 60);

    const minutes = Math.trunc(number / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (number % 60).toString().padStart(2, '0');

    return `${minutes}:${seconds}`;

    // if (number % 60 === 0) {
    //   // console.log(`min: ${number / 60}, secs: 0`);
    //   return `${number / 60}: 0`;
    // } else {
    //   // console.log(`min: ${Math.trunc(number / 60)}, secs: ${number % 60}`);
    //   return `${Math.trunc(number / 60)}:${(number % 60)}`;
    // }
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
  componentWillUnmount() {
    // document.removeEventListener('keyup', this.cancel, false);

    this.deleteTimer;
  }

  // componentDidUpdate() {
  //   console.log('Mins have been changed');
  // }

  render() {
    const {
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
      // mins,
      // secs,
      duration,
      id,
    } = this.props;
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
            autoFocus={true}
            id={`task-${id}`}
            onClick={onToggleDone}
            className="toggle"
            type="checkbox"
          />
          <label htmlFor={`task-${id}`}>
            <span className="title">{text}</span>
            <span className="description">
              <button className="icon icon-play" onClick={onStartTimer}></button>
              <button className="icon icon-pause" onClick={onStopTimer}></button>
              {/* {mins}:{secs} */}
              {this.timeConvertor(duration)}
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
