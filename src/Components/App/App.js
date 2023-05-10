import React, { Component } from 'react';

import Header from '../Header/Header';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';
console.log('done!');
export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.creareTodoItem('Learn React', new Date(2023, 3, 13)),
      this.creareTodoItem('Make Todo App', new Date(2023, 3, 19)),
      this.creareTodoItem('Pass the review', new Date(2023, 4, 4)),
    ],
  };

  // Добавить defaultProps для даты
  creareTodoItem(text, date = new Date()) {
    return {
      text,
      status: '',
      done: false,
      id: this.maxId++,
      hidden: false,
      date,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newData = [...todoData];

      // 1. find all NOT "done"
      const uncompletedTasks = newData.filter((el) => !el.done);

      return {
        // 2. update tasks list
        todoData: uncompletedTasks,
      };
    });
  };

  addItem = (text) => {
    if (text === '' || text[0] === ' ') return;

    const newItem = this.creareTodoItem(text);

    //add element in array
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      // 1. update object
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      // 2. cunstract new array
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  // Filter functions
  showAll = () => {
    this.setState(({ todoData }) => {
      const newData = [...todoData];

      const showedElements = newData.map((el) => {
        return { ...el, hidden: false };
      });

      const newArray = showedElements.sort((prevTask, nextTask) => prevTask.id - nextTask.id);

      return {
        todoData: newArray,
      };
    });
  };

  showActive = () => {
    this.setState(({ todoData }) => {
      const newData = [...todoData];
      const resetData = newData.map((el) => {
        return { ...el, hidden: false };
      });

      const completedTasks = resetData.filter((el) => el.done);
      const uncompletedTasks = resetData.filter((el) => !el.done);

      const hiddenElements = completedTasks.map((el) => {
        return { ...el, hidden: true };
      });

      const newArray = [...hiddenElements, ...uncompletedTasks];

      return {
        todoData: newArray,
      };
    });
  };

  showCompleted = () => {
    this.setState(({ todoData }) => {
      const newData = [...todoData];

      const resetData = newData.map((el) => {
        return { ...el, hidden: false };
      });

      const completedTasks = resetData.filter((el) => el.done);
      const uncompletedTasks = resetData.filter((el) => !el.done);

      const hiddenElements = uncompletedTasks.map((el) => {
        return { ...el, hidden: true };
      });

      const newArray = [...hiddenElements, ...completedTasks];

      return {
        todoData: newArray,
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <section className="todoapp">
        <Header />
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList todos={this.state.todoData} onDeleted={this.deleteItem} onToggleDone={this.onToggleDone} />
        <Footer
          toDo={todoCount}
          onClearAll={this.clearCompleted}
          onAllClick={this.showAll}
          onActiveClick={this.showActive}
          onCompletedClick={this.showCompleted}
        />
      </section>
    );
  }
}
