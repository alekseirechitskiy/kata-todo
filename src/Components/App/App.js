import React, { Component } from 'react';

import Header from '../Header/Header';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

export default class App extends Component {
  maxId = 100;

  constructor() {
    super();
  }

  state = {
    todoData: [
      this.creareTodoItem('Learn React', 6000, 0, new Date(2023, 3, 13)),
      this.creareTodoItem('Make Todo App', 1200, 0, new Date(2023, 3, 19)),
      this.creareTodoItem('Pass the review', 60, 0, new Date(2023, 4, 4)),
      this.creareTodoItem('Test the timer', 0, 5, new Date()),
    ],
  };

  creareTodoItem(text, mins, secs, date = new Date()) {
    return {
      text,
      done: false,
      editing: false,
      id: this.maxId++,
      hidden: false,
      date,
      mins,
      secs,
      duration: Number(mins * 60) + Number(secs),
      isTracked: 'untracked',
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
      const uncompletedTasks = newData.filter((el) => !el.done);
      return {
        todoData: uncompletedTasks,
      };
    });
  };

  addItem = (text, mins, secs) => {
    if (text === '' || text[0] === ' ') return;
    const newItem = this.creareTodoItem(text, mins, secs);
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  onEdited = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, editing: !oldItem.editing };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  editTask = () => {
    this.setState(({ todoData }) => {
      const newArray = [...todoData];
      newArray.forEach((el) => (el.editing = false));
      return { todoData: newArray };
    });
  };

  onTextCange = (e) => {
    this.setState(({ todoData }) => {
      const newArray = [...todoData];
      const idx = newArray.findIndex((el) => el.text === e.target.defaultValue);
      const editedElement = newArray[idx];
      const newItem = { ...editedElement, text: e.target.value };
      const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return { todoData: newData };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  // TIMER FUNCTIONS
  timer = (id) => {
    this[`task${id}`] = setInterval(() => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];

        if (oldItem.duration === 0) {
          console.warn(`Time for task "${oldItem.text}" is over!`);
          this.deleteTaskTimer(id);
          return;
        }

        const newItem = { ...oldItem, duration: oldItem.duration - 1 };
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newArray,
        };
      });
    }, 1000);
  };

  startTimer = (id) => {
    const idx = this.state.todoData.findIndex((el) => el.id === id);
    if (this.state.todoData[idx].isTracked === 'tracked') {
      console.warn('Timer for this task is already running.');
      return;
    } else if (this.state.todoData[idx].duration === 0) {
      console.warn('Timer for this task is over.');
    } else {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];
        const newItem = { ...oldItem, isTracked: 'tracked' };
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
        return {
          todoData: newArray,
        };
      });
      this.timer(id);
    }
  };

  stopTimer = (id) => {
    clearInterval(this[`task${id}`]);

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, isTracked: 'paused' };
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  deleteTaskTimer = (id) => {
    const task = this.state.todoData.find((el) => el.id === id);

    clearInterval(this[`task${id}`]);
    console.warn(`Timer for task "${task.text}" has been removed!`);
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

  // LIFECYCLES HOOKS
  componentDidUpdate = () => {
    this.timer;
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <section className="todoapp">
        <Header />
        <NewTaskForm onItemAdded={this.addItem} />
        <TaskList
          todos={this.state.todoData}
          editTask={this.editTask}
          onTextCange={this.onTextCange}
          onEdited={this.onEdited}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          onStartTimer={this.startTimer}
          onStopTimer={this.stopTimer}
          deleteTaskTimer={this.deleteTaskTimer}
        />
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
