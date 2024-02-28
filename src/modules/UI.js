import * as logic from './Logic';

export default class UI {
	static idsDom() {}

	static addEventListeners() {
		const formSubmitTodo = document.getElementById('form-submit-todo');
		const sidebarProjects = document.querySelectorAll('.projects');

		formSubmitTodo.addEventListener('submit', (event) => {
			UI.handleTodoForm(event);
		});
		sidebarProjects.forEach((project) => {
			project.addEventListener('click', () => {
				UI.changeProject(project);
			});
		});
	}

	static changeProject(element) {
		const activeProject = document.getElementById('div-current-project');
		activeProject.innerHTML = element.innerText;
		UI.clearTodoList();
		UI.updateTodoList(activeProject.innerHTML);
	}

	static getActiveProject() {
		const activeProject = document.getElementById(
			'div-current-project',
		).innerHTML;
		console.log(`Current Active Project is ${activeProject}`);
		return activeProject;
	}

	static updateTodoList(project) {
		const currentProject = logic.getActiveProject(project);
		currentProject.projectTodos.forEach((todo) => {
			UI.createTodoComponent(
				todo.title,
				todo.description,
				todo.notes,
				todo.dueDate,
				todo.priority,
				todo.id,
			);
		});
	}

	static clearTodoList() {
		const divTodoList = document.getElementById('todo-list');
		divTodoList.innerHTML = '';
	}

	static handleTodoForm(Event) {
		Event.preventDefault();
		const currentProject = UI.getActiveProject();
		const todo = logic.parseTodoForm();

		logic.addTodoToProject(todo, currentProject);
		UI.createTodoComponent(
			todo.title,
			todo.notes,
			todo.description,
			todo.dueDate,
			todo.priority,
			todo.id,
		);
	}

	static attachAllListeners() {
		UI.attachListenersToCheckboxes();
		UI.attachListenersToEditButtons();
		UI.attachListenersToPriorityButtons();
	}

	static createTodoComponent(title, description, notes, dueDate, priority, id) {
		const divTodoList = document.getElementById('todo-list');
		const todoComponentHTML = `<div class="todo" id="${id}">
            <div id="div-todo-component">
                <input type="checkbox" id="todo-checkbox-${id}" class='todo-checkbox'>
                <label for="todo-checkbox-${id}" id="todo-checkbox-label">
                <div id="div-todo-title">${title}</div>
                <div id="div-todo-description">${description}</div>
                <div id="div-todo-notes">${notes}</div>
                <div id="div-todo-date">${dueDate}</div>
        </label>
                <button id="todo-priority-${id}" class="material-symbols-outlined priority-button-todo button-todo-priority-${priority}">priority_high</button>
                <button id="todo-edit-${id}" class="material-symbols-outlined edit-button-todo">edit</button>
            </div>
    </div>`;

		divTodoList.insertAdjacentHTML('beforeend', todoComponentHTML);

		const priorityButton = document.getElementById(`todo-priority-${id}`);
		priorityButton.addEventListener('click', () => {
			UI.changePriority(priorityButton);
		});

		const editButton = document.getElementById(`todo-edit-${id}`);
		editButton.addEventListener('click', () => {
			UI.handleEditButton(editButton);
		});

		const checkbox = document.getElementById(`todo-checkbox-${id}`);
		checkbox.addEventListener('change', () => {
			setTimeout(() => {
				if (checkbox.checked) {
					UI.handleCheckboxCheck(checkbox);
				}
			}, 2000);
		});
	}

	static extractIdFromHtmlId(element) {
		return element.id.match(/\d/g).join('');
	}

	static changePriority(element) {
		const todoId = this.extractIdFromHtmlId(element);
		const newPriorityStatus = logic.togglePriorityStatus(
			UI.getActiveProject(),
			todoId,
		);
		const newClassName = `material-symbols-outlined priority-button-todo button-todo-priority-${newPriorityStatus}`;

		element.className = newClassName;
	}

	static handleEditButton(element) {
		const todoId = this.extractIdFromHtmlId(element);
		alert(`This Edit Button with Todo ${todoId} was alert`);
	}

	static handleCheckboxCheck(element) {
		const todoId = this.extractIdFromHtmlId(element);
		const todoStatus = logic.changeTodoStatus(UI.getActiveProject(), todoId);
		if (todoStatus === true) {
			const todoComponent = document.getElementById(todoId);
			console.log('Remove Todo from Todo List in DOM');
			todoComponent.remove();
		}

		console.log('No todo found');
	}

	static attachListenersToPriorityButtons() {
		const buttons = document.querySelectorAll('.priority-button-todo');

		buttons.forEach((button) => {
			const todoId = button.id.slice(14);
			button.addEventListener('click', () => {
				const newPriorityStatus = logic.togglePriorityStatus(
					UI.getActiveProject(),
					todoId,
				);
				const newClassName = `material-symbols-outlined priority-button-todo button-todo-priority-${newPriorityStatus}`;
				button.className = newClassName;
			});
		});
	}

	static attachListenersToEditButtons() {
		const buttons = document.querySelectorAll('.edit-button-todo');

		buttons.forEach((button) => {
			const todoId = button.id.slice(10);
			button.addEventListener('click', () => {
				alert(`Edit this TODO with id ${todoId}`);
			});
		});
	}

	static attachListenersToCheckboxes() {
		const checkboxes = document.querySelectorAll('.todo-checkbox');

		checkboxes.forEach((checkbox) => {
			function clickHandler() {
				const todoStatus = logic.changeTodoStatus(
					UI.getActiveProject(),
					todoId,
				);
				if (todoStatus === true) {
					const todoComponent = document.getElementById(todoId);
					console.log('Remove Todo from Todo List in DOM');
					todoComponent.remove();
				}
			}

			const todoId = checkbox.id.slice(14);
			checkbox.addEventListener('click', clickHandler());
		});
	}
}
