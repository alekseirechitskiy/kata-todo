import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    text: '',
    mins: '',
    secs: '',
  };

  onTextCange = (evt) => {
    this.setState({
      text: evt.target.value,
    });
  };

  onMinsCange = (evt) => {
    this.setState({
      mins: evt.target.value,
    });
  };

  onSecsCange = (evt) => {
    this.setState({
      secs: evt.target.value,
    });
  };

  onSubmit = (evt) => {
    evt.preventDefault();
    this.props.onItemAdded(this.state.text, this.state.mins, this.state.secs);
    this.setState({
      text: '',
      mins: '',
      secs: '',
    });
    // console.log(this.state.text, this.state.mins, this.state.secs);
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onTextCange}
          value={this.state.text}
        />
        <input
          className="new-todo-form__timer"
          onChange={this.onMinsCange}
          value={this.state.mins}
          placeholder="Min"
          onClick={this.props.startTimer}
          type="number"
          min={0}
        />
        <input
          className="new-todo-form__timer"
          onChange={this.onSecsCange}
          value={this.state.secs}
          placeholder="Sec"
          type="number"
          min={0}
          max={59}
        />
        <input type="submit" hidden />
      </form>
    );
  }
}
