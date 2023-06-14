import React, { useState, useRef } from 'react';

import Header from '../Header/Header';
import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';
import './App.css';
// import { max } from 'date-fns';

const App = () => {
  // state = {
  //   todoData: [
  //     this.creareTodoItem('Learn React', 6000, 0, new Date(2023, 3, 13)),
  //     this.creareTodoItem('Make Todo App', 1200, 0, new Date(2023, 3, 19)),
  //     this.creareTodoItem('Pass the review', 60, 0, new Date(2023, 4, 4)),
  //     this.creareTodoItem('Test the timer', 0, 5, new Date()),
  //   ],
  // };

  // let maxId = 100;

  const testId = useRef(100);

  const [todoData, setTodoData] = useState([
    creareTodoItem('Learn React', 6000, 0, new Date(2023, 3, 13)),
    creareTodoItem('Make Todo App', 1200, 0, new Date(2023, 3, 19)),
    creareTodoItem('Pass the review', 60, 0, new Date(2023, 4, 4)),
    creareTodoItem('Test the timer', 0, 5, new Date()),
  ]);

  // LIFECYCLES HOOKS
  // componentDidUpdate = () => {
  //   this.timer;
  // };

  // useEffect(() => {
  //   console.log(todoData);
  // }, [todoData]);

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

  // === DONE ===
  const deleteItem = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    setTodoData([...todoData.slice(0, idx), ...todoData.slice(idx + 1)]);

    // setTodoData(todoData.filter((t) => t.id !== task.id));

    // setPosts(posts.filter((p) => p.id !== post.id));

    // this.setState(({ todoData }) => {
    //   const idx = todoData.findIndex((el) => el.id === id);
    //   const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  // === DONE ===
  const clearCompleted = () => {
    setTodoData(todoData.filter((el) => !el.done));

    // this.setState(({ todoData }) => {
    //   const newData = [...todoData];
    //   const uncompletedTasks = newData.filter((el) => !el.done);
    //   return {
    //     todoData: uncompletedTasks,
    //   };
    // });
  };

  // === DONE ===
  const addItem = (text, mins, secs) => {
    if (text === '' || text[0] === ' ') return;
    const newItem = creareTodoItem(text, mins, secs);
    setTodoData([...todoData, newItem]);

    // this.setState(({ todoData }) => {
    //   const newArray = [...todoData, newItem];
    //   return { todoData: newArray };
    // });
  };

  // === DONE ===
  const onEdited = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, editing: !oldItem.editing };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);

    // setTodoData([...todoData, (todoData[id].editing = !todoData[id].editing)]);

    // this.setState(({ todoData }) => {
    //   const idx = todoData.findIndex((el) => el.id === id);
    //   const oldItem = todoData[idx];
    //   const newItem = { ...oldItem, editing: !oldItem.editing };
    //   const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  // === DONE ===
  const editTask = () => {
    console.log('fasdfdsfadsf');
    setTodoData(todoData.map((el) => ({ ...el, editing: false })));

    // const idx = todoData.findIndex((el) => el.id === id);
    // const oldItem = todoData[idx];
    // const newItem = { ...oldItem, editing: false };
    // setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
    // setTodoData(todoData.forEach((el) => (el.editing = false)));
    // console.log('editTask(): ', todoData);
    // this.setState(({ todoData }) => {
    //   const newArray = [...todoData];
    //   newArray.forEach((el) => (el.editing = false));
    //   return { todoData: newArray };
    // });
  };

  // === DONE ===
  const onTextCange = (e) => {
    const newArray = [...todoData];
    const idx = newArray.findIndex((el) => el.text === e.target.defaultValue);
    const editedElement = newArray[idx];
    const newItem = { ...editedElement, text: e.target.value };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);

    // this.setState(({ todoData }) => {
    //   const newArray = [...todoData];
    //   const idx = newArray.findIndex((el) => el.text === e.target.defaultValue);
    //   const editedElement = newArray[idx];
    //   const newItem = { ...editedElement, text: e.target.value };
    //   const newData = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    //   return { todoData: newData };
    // });
  };

  // === DONE ===
  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done };

    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);

    // this.setState(({ todoData }) => {
    //   const idx = todoData.findIndex((el) => el.id === id);
    //   const oldItem = todoData[idx];
    //   const newItem = { ...oldItem, done: !oldItem.done };
    //   const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  // TIMER FUNCTIONS

  // === DONE ===
  const timer = (timerName, id) => {
    console.log('FROM TIMER timerName: ', timerName);
    timerName = setInterval(() => {
      // console.log('timerName: ', timerName);
      setTodoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const oldItem = todoData[idx];

        if (oldItem.duration === 0) {
          console.warn(`Time for task "${oldItem.text}" is over!`);
          clearInterval(timerName);
          return [...todoData];
        }

        if (oldItem.isTracked === 'paused') {
          console.warn('timer is paused');
          clearInterval(timerName);
          return [...todoData];
        }

        const newItem = { ...oldItem, duration: oldItem.duration - 1 };
        return [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      });
    }, 1000);

    // console.log(timerName, id);
    //   console.log('oldItem: ', oldItem);
    //   // console.log('oldItem: ', oldItem);
    //   console.log('newItem: ', newItem);
    //   // setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
    //   setTodoData(([...todoData]) => {
    //     [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    //   });
    //   console.log('todoData: ', todoData);

    // if (oldItem.duration === 0) {
    //   console.warn(`Time for task "${oldItem.text}" is over!`);
    //   deleteTaskTimer(id);
    //   return;
    // }

    // this.setState(({ todoData }) => {
    //   const idx = todoData.findIndex((el) => el.id === id);
    //   const oldItem = todoData[idx];

    //   if (oldItem.duration === 0) {
    //     console.warn(`Time for task "${oldItem.text}" is over!`);
    //     this.deleteTaskTimer(id);
    //     return;
    //   }

    //   const newItem = { ...oldItem, duration: oldItem.duration - 1 };
    //   const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  // === DONE ===
  const startTimer = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    if (todoData[idx].isTracked === 'tracked') {
      console.warn('Timer for this task is already running.');
      return;
    } else if (todoData[idx].duration === 0) {
      console.warn('Timer for this task is over.');
      return;
    } else {
      console.log(id);
      const idx = todoData.findIndex((el) => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, isTracked: 'tracked' };
      setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);
      timer(`task${id}`, id);

      // this.setState(({ todoData }) => {
      //   const idx = todoData.findIndex((el) => el.id === id);
      //   const oldItem = todoData[idx];
      //   const newItem = { ...oldItem, isTracked: 'tracked' };
      //   const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
      //   return {
      //     todoData: newArray,
      //   };
      // });
    }
  };

  // === DONE ===
  const stopTimer = (id) => {
    // clearInterval(id);

    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, isTracked: 'paused' };
    setTodoData([...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]);

    // this.setState(({ todoData }) => {
    //   const idx = todoData.findIndex((el) => el.id === id);
    //   const oldItem = todoData[idx];
    //   const newItem = { ...oldItem, isTracked: 'paused' };
    //   const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  const deleteTaskTimer = (id) => {
    const task = todoData.find((el) => el.id === id);

    clearInterval(id);
    console.warn(`Timer for task "${task.text}" has been removed!`);
  };

  // Filter functions
  // === DONE ===
  const showAll = () => {
    const newData = [...todoData];

    const showedElements = newData.map((el) => {
      return { ...el, hidden: false };
    });

    setTodoData(showedElements.sort((prevTask, nextTask) => prevTask.id - nextTask.id));

    // this.setState(({ todoData }) => {
    //   const newData = [...todoData];

    //   const showedElements = newData.map((el) => {
    //     return { ...el, hidden: false };
    //   });

    //   const newArray = showedElements.sort((prevTask, nextTask) => prevTask.id - nextTask.id);

    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  // === DONE ===
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

    // this.setState(({ todoData }) => {
    //   const newData = [...todoData];
    //   const resetData = newData.map((el) => {
    //     return { ...el, hidden: false };
    //   });

    //   const completedTasks = resetData.filter((el) => el.done);
    //   const uncompletedTasks = resetData.filter((el) => !el.done);

    //   const hiddenElements = completedTasks.map((el) => {
    //     return { ...el, hidden: true };
    //   });

    //   const newArray = [...hiddenElements, ...uncompletedTasks];

    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  // === DONE ===
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

    // this.setState(({ todoData }) => {
    //   const newData = [...todoData];

    //   const resetData = newData.map((el) => {
    //     return { ...el, hidden: false };
    //   });

    //   const completedTasks = resetData.filter((el) => el.done);
    //   const uncompletedTasks = resetData.filter((el) => !el.done);

    //   const hiddenElements = uncompletedTasks.map((el) => {
    //     return { ...el, hidden: true };
    //   });

    //   const newArray = [...hiddenElements, ...completedTasks];

    //   return {
    //     todoData: newArray,
    //   };
    // });
  };

  const doneCount = todoData.filter((el) => el.done).length;
  const todoCount = todoData.length - doneCount;

  console.log(todoData);

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
        deleteTaskTimer={deleteTaskTimer}
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
