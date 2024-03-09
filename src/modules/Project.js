import { isBefore, isToday, format } from 'date-fns';
import idGenerator from './IdGenerator';

export default class Project {
	constructor(name) {
		this.name = name;
		this.projectTodos = [];
		this.id = idGenerator();
	}

	pushTodoToProject(todo) {
		if (todo) {
			this.projectTodos.push(todo);
		}
	}

	findTodoById(id) {
		if (id) {
			return this.projectTodos.find((todo) => todo.id === id);
		}
		return console.log(`No ${id} found within ${this.name}`);
	}

	filterCompletedTodos() {
		this.projectTodos = this.projectTodos.filter((todo) => !todo.status);
	}

	filterByTodayDate() {
		const today = format(new Date(), 'dd/MM/yyyy');

		const filteredTodos = this.projectTodos.filter(
			(todo) => todo.dueDate === today,
		);
		return filteredTodos;
	}

	removeTodosDueToday() {
		const filteredTodos = this.filterByTodayDate();
		filteredTodos.forEach((todo) =>
			this.projectTodos.splice(this.projectTodos.indexOf(todo, 1)),
		);
	}
}
