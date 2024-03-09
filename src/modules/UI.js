import * as logic from './Logic';
import { format } from 'date-fns';
export default class UI {
	static reloadProjects() {
		UI.clearProjects();
		const projectsSidebar = document.getElementById('div-sidebar-projects');
		logic.projects.forEach((project) => {
			const newProjectComponent = UI.createProjectComponent(
				project.name,
				project.id,
			);
			projectsSidebar.insertAdjacentHTML('beforeend', newProjectComponent);
			const newProjectElement = document.getElementById(
				`sidebar-${project.name}`,
			);
			newProjectElement.addEventListener('click', () => {
				UI.changeProject(newProjectElement);
			});
		});
	}

	static clearProjects() {
		const projectsSidebar = document.getElementById('div-sidebar-projects');
		projectsSidebar.innerHTML = '';
	}

	static addEventListeners() {
		const formSubmitTodo = document.getElementById('form-submit-todo');
		const submitProjectButton = document.getElementById(
			'submit-project-button',
		);

		formSubmitTodo.addEventListener('submit', (event) => {
			UI.handleTodoForm(event);
		});

		submitProjectButton.addEventListener('click', (Event) => {
			Event.preventDefault();
			const name = document.getElementById('project-name').value;
			UI.checkIfProjectExists(name);
			console.log('Submitted new Project');
		});
	}

	static changeProject(element) {
		const activeProject = document.getElementById('div-current-project');
		activeProject.innerHTML = element.innerText;
		const newActiveProject = activeProject.innerText;
		this.reloadTodos(newActiveProject);
	}

	static reloadTodos(project) {
		UI.clearTodoList();
		UI.updateTodoList(project);
	}

	static getActiveProject() {
		const activeProject = document.getElementById(
			'div-current-project',
		).innerText;
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

	static setFormDatesToToday() {
		const formDateElement = document.getElementById('form-todo-date');
		const today = format(new Date(), 'yyyy-MM-dd');
		console.log(`Today is ${today}`);
		formDateElement.setAttribute('value', today);
		formDateElement.setAttribute('min', today);
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

	static createProjectComponent(name, id) {
		const newProjectComponent = `
<div id="sidebar-${name}" class="projects ${id}">${name}</div>
`;
		return newProjectComponent;
	}

	static createNewProject(name) {
		const sidebarDiv = document.getElementById('div-sidebar-projects');

		const projectObjectId = logic.createNewProject(name).id;
		const newProjectComponent = UI.createProjectComponent(
			name,
			projectObjectId,
		);

		sidebarDiv.insertAdjacentHTML('beforeend', newProjectComponent);

		const newProjectElement = document.getElementById(`sidebar-${name}`);
		newProjectElement.addEventListener('click', () => {
			UI.changeProject(newProjectElement);
		});
	}

	static checkIfProjectExists(name) {
		const doesExist = logic.checkForProject(name);
		doesExist
			? alert(`Project ${name} already exists!`)
			: UI.createNewProject(name);
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

		let timeoutId = null;
		const checkbox = document.getElementById(`todo-checkbox-${id}`);
		checkbox.addEventListener('change', () => {
			if (!checkbox.checked) {
				clearTimeout(timeoutId);
				timeoutId = null;
				return;
			}

			clearTimeout(timeoutId);

			timeoutId = setTimeout(() => {
				UI.handleCheckboxCheck(checkbox);
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
		const todoId = UI.extractIdFromHtmlId(element);
		const editPopup = this.divEditPopup(todoId);
		const divMainContent = document.getElementById('div-main-content');
		divMainContent.insertAdjacentHTML('beforebegin', editPopup);

		const closeButton = document.getElementById('div-close-edit');
		closeButton.addEventListener('click', () => {
			this.closeEditPopup();
		});

		const submitEditButton = document.getElementById('edit-todo-button');
		submitEditButton.addEventListener('click', () => {
			alert('Edit submitted');
			logic.editTodoInProject(this.getActiveProject(), todoId);
			this.closeEditPopup();
			this.reloadTodos(this.getActiveProject());
		});
	}

	static closeEditPopup() {
		const popupContainer = document.getElementById('popup-EditFormContainer');
		popupContainer.remove();
	}

	static divEditPopup(todoId) {
		const activeProject = UI.getActiveProject();
		const todo = logic.findTodoById(activeProject, todoId);
		const todayEdit = new Date();

		const divEditPopup = `<div class="popup-EditContainer" id="popup-EditFormContainer">
  <div class="div-popup-edit">
    <div class="close" id="div-close-edit">&times;</div>
    <div class="edit-title" id="div-edit-todo-title">Editing ${todo.title}</div>
    <form class="edit-todo" >
                    <input type="text"  id="edit-todo-title" placeholder="Title: ${todo.title}" >
                    <input type="text" id="edit-todo-description" placeholder="Description: ${todo.description}" >
                    <input type="text" id="edit-todo-notes" placeholder="Notes: ${todo.notes}">
                    <input type="date" id="edit-todo-date" value="${todo.dueDate}" min= "${todayEdit}" >
                <button type="submit" class="material-symbols-outlined" id="edit-todo-button">
                    published_with_changes</button>
    </form>
  </div>
</div>
`;
		return divEditPopup;
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
