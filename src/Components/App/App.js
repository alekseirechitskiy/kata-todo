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
    // count: 0,
    // date: new Date().toLocaleString(),
    todoData: [
      this.creareTodoItem('Learn React', 6000, 0, new Date(2023, 3, 13)),
      this.creareTodoItem('Make Todo App', 1200, 0, new Date(2023, 3, 19)),
      this.creareTodoItem('Pass the review', 60, 0, new Date(2023, 4, 4)),
    ],
  };

  // Добавить defaultProps для даты
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

      // 1. find all NOT "done"
      const uncompletedTasks = newData.filter((el) => !el.done);

      return {
        // 2. update tasks list
        todoData: uncompletedTasks,
      };
    });
  };

  addItem = (text, mins, secs) => {
    if (text === '' || text[0] === ' ') return;

    const newItem = this.creareTodoItem(text, mins, secs);

    //add element in array
    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return { todoData: newArray };
    });
  };

  onEdited = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      // 1. update object
      const oldItem = todoData[idx];

      const newItem = { ...oldItem, editing: !oldItem.editing };

      // 2. cunstruct new array
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

      // 1. update object
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, done: !oldItem.done };

      // 2. cunstruct new array
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  // onEscPress = (id) => {
  //   console.log('ESC from APP');
  //   console.log(id);
  //   this.setState(({ todoData }) => {
  //     const oldArray = [...todoData];

  //     oldArray.forEach((el) => {
  //       el.editing = false;
  //     });

  //     return { todoData: oldArray };
  //   });
  // };

  // TIMER FUNCTIONS
  timer = (id) => {
    console.log('id FROM TIMER: ', id);

    // this.timerId = setInterval(() => {
    this[`test${id}`] = setInterval(() => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);

        // 1. update object
        const oldItem = todoData[idx];

        // const newItem = { ...oldItem, mins: oldItem.mins - 1 };
        if (oldItem.duration === 0) {
          console.warn('ТАЙМЕР ИССЯК =(');
          this.deleteTaskTimer(id);
          return;
        }
        const newItem = { ...oldItem, duration: oldItem.duration - 1 };

        // 2. cunstruct new array
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return {
          todoData: newArray,
        };
      });
    }, 1000);
  };

  startTimer = (id) => {
    // console.log('START TIMER');
    // console.log('id: ', id);

    const idx = this.state.todoData.findIndex((el) => el.id === id);
    // console.log('idx: ', idx);
    // console.log('INITIAL TRACK STATUS', this.state.todoData[idx].isTracked);

    if (this.state.todoData[idx].isTracked === 'tracked') {
      console.warn('Timer for this task is already running');
      return;
    } else {
      console.log('START TIMER');

      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];

        // SET FLAG "ISTRACKED"
        const newItem = { ...oldItem, isTracked: 'tracked' };

        // 2. cunstruct new array
        const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];

        return {
          todoData: newArray,
        };
      });

      this.timer(id);
    }
  };

  stopTimer = (id) => {
    console.log('STOP TIMER');
    console.log(id);
    clearInterval(this[`test${id}`]);
    // clearInterval(this.timerId);

    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, isTracked: 'paused' };

      // 2. cunstruct new array
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

  // LIFECYCLES HOOKS
  componentDidMount = () => {};

  componentDidUpdate = () => {
    console.log(this.state.todoData);
    this.timer;
  };

  deleteTaskTimer = (id) => {
    clearInterval(this[`test${id}`]);
    console.log(`Timer for task with id ${id} has ben deleted!`);
  };

  render() {
    const { todoData } = this.state;
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    // console.log(this.state.todoData[0].duration);

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
          // onEscPress={this.onEscPress}
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
