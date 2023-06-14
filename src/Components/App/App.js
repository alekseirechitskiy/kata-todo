import React, { useState, useRef } from 'react';

import Header from '../Header/Header';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';

const App = () => {
  const testId = useRef(100);

  const [todoData, setTodoData] = useState([
    creareTodoItem('Learn React', 6000, 0, new Date(2023, 3, 13)),
    creareTodoItem('Make Todo App', 1200, 0, new Date(2023, 3, 19)),
    creareTodoItem('Pass the review', 60, 0, new Date(2023, 4, 4)),
    creareTodoItem('Test the timer', 0, 5, new Date()),
  ]);

  function creareTodoItem(text, mins, secs, date = new Date()) {
    return {
      text,
      done: false,
      editing: false,
      id: testId.current++,
      hidden: false,
      date,
      mins,
      secs,
      duration: Number(mins * 60) + Number(secs),
      isTracked: 'untracked',
    };
  }

  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData([...todoData.slice(0, idx), ...todoData.slice(idx + 1)]);
  };

  const clearCompleted = () => {
    setTodoData(todoData.filter((el) => !el.done));
  };

  const addItem = (text, mins, secs) => {
    if (text === '' || text[0] === ' ') return;
    const newItem = creareTodoItem(text, mins, secs);
    setTodoData([...todoData, newItem]);
  };

  const onEdited = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, editing: !oldItem.editing };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const editTask = () => {
    setTodoData(todoData.map((el) => ({ ...el, editing: false })));
  };

  const onTextCange = (e) => {
    const newArray = [...todoData];
    const idx = newArray.findIndex((el) => el.text === e.target.defaultValue);
    const editedElement = newArray[idx];
    const newItem = { ...editedElement, text: e.target.value };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done };

    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  // TIMER FUNCTIONS
  const timer = (id) => {
    const timerName = setInterval(() => {
      setTodoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];

        if (!oldItem) {
          return [...todoData];
        }

        if (oldItem.isTracked === 'tracked' && oldItem.duration === 0) {
          clearInterval(timerName);
          return [...todoData];
        }

        if (oldItem.isTracked === 'paused') {
          clearInterval(timerName);
          return [...todoData];
        }

        const newItem = { ...oldItem, duration: oldItem.duration - 1 };
        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      });
    }, 1000);
  };

  const startTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    if (todoData[idx].isTracked === 'tracked') {
      return;
    } else if (todoData[idx].duration === 0) {
      return;
    } else {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, isTracked: 'tracked' };
      setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
      timer(id);
    }
  };

  const stopTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, isTracked: 'paused' };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
  };

  // Filter functions
  const showAll = () => {
    const newData = [...todoData];
    const showedElements = newData.map((el) => {
      return { ...el, hidden: false };
    });

    setTodoData(showedElements.sort((prevTask, nextTask) => prevTask.id - nextTask.id));
  };

  const showActive = () => {
    const newData = [...todoData];
    const resetData = newData.map((el) => {
      return { ...el, hidden: false };
    });
    const completedTasks = resetData.filter((el) => el.done);
    const uncompletedTasks = resetData.filter((el) => !el.done);
    const hiddenElements = completedTasks.map((el) => {
      return { ...el, hidden: true };
    });

    setTodoData([...hiddenElements, ...uncompletedTasks]);
  };

  const showCompleted = () => {
    const newData = [...todoData];
    const resetData = newData.map((el) => {
      return { ...el, hidden: false };
    });
    const completedTasks = resetData.filter((el) => el.done);
    const uncompletedTasks = resetData.filter((el) => !el.done);
    const hiddenElements = uncompletedTasks.map((el) => {
      return { ...el, hidden: true };
    });
    setTodoData([...hiddenElements, ...completedTasks]);
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  return (
    <section className="todoapp">
      <Header />
      <NewTaskForm onItemAdded={addItem} />
      <TaskList
        todos={todoData}
        editTask={editTask}
        onTextCange={onTextCange}
        onEdited={onEdited}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onStartTimer={startTimer}
        onStopTimer={stopTimer}
      />
      <Footer
        toDo={todoCount}
        onClearAll={clearCompleted}
        onAllClick={showAll}
        onActiveClick={showActive}
        onCompletedClick={showCompleted}
      />
    </section>
  );
};

export default App;
