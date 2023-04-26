import Header from "../Header/Header";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import "./App.css";

const todoData = [
	{ text: "Learn React", status: "", id: 1 },
	{ text: "Task 1", status: "completed", id: 2 },
	{ text: "Task 2", status: "", id: 3 },
];

function App() {
	return (
		<section className="todoapp">
			<Header />
			<NewTaskForm />
			<TaskList todos={todoData} />
			<Footer />
		</section>
	);
}

export default App;
