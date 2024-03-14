import { isBefore, isToday, format, isAfter, parse } from 'date-fns';
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
			const found = this.projectTodos.find((todo) => {
				return todo.id === id;
			});

			if (found) {
				return found;
			}
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

	filterByUpcoming() {
		const today = new Date();

		const filteredTodos = this.projectTodos.filter((todo) => {
			const dueDate = parse(todo.dueDate, 'dd/MM/yyyy', new Date());
			return isAfter(dueDate, today);
		});
		return filteredTodos;
	}

	filterByPastDue() {
		const today = new Date();

		const filteredTodos = this.projectTodos.filter((todo) => {
			const dueDate = parse(todo.dueDate, 'dd/MM/yyyy', new Date());
			return isAfter(dueDate, today);
		});
		return filteredTodos;
	}

	removeTodosDueToday() {
		const filteredTodos = this.filterByTodayDate();
		filteredTodos.forEach((todo) =>
			this.projectTodos.splice(this.projectTodos.indexOf(todo, 1)),
		);
		return filteredTodos;
	}
}
