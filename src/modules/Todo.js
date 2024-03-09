import { format, parseISO } from 'date-fns';
import idGenerator from './IdGenerator';
export default class Todo {
	// This creates the initial object of the todo
	constructor(status, title, description, notes, dueDate, priority) {
		this.status = status;
		this.description = description;
		this.title = title;
		this.notes = notes;
		this.dueDate = dueDate;
		this.priority = priority;
		this.id = idGenerator();
	}

	changePriority() {
		if (this.priority === 'low') {
			this.priority = 'medium';
		} else if (this.priority === 'medium') {
			this.priority = 'high';
		} else {
			this.priority = 'low';
		}
	}

	changeStatus() {
		if (this.status === true) {
			this.status = false;
		} else if (this.status === false) {
			this.status = true;
		}
	}

	setdateFormatted() {
		if (!this.dueDate) {
			return 'DD/MM/YY';
		}
		const dateParse = this.dueDate;

		const dateObject = format(parseISO(dateParse), 'dd/MM/yyyy');
		this.dueDate = dateObject;
		return dateObject;
	}
}
