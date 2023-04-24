import Header from "../Header/Header";
import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import "./App.css";

const todoData = [
	{ text: "Completed task", status: "completed", id: 1 },
	{ text: "Editing task", status: "", id: 2 },
	{ text: "Active task", status: "", id: 3 },
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
