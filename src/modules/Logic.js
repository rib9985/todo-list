import Todo from './Todo';
import Project from './Project';
import Storage from './LocalStorage';
//

const projects = [];

function instantiateDefaultProjects() {
	const inbox = new Project('Inbox', []);
	const today = new Project('Today', []);
	const pastDue = new Project('Past Due', []);
	const upcoming = new Project('Upcoming', []);
	projects.push(inbox, today, pastDue, upcoming);
	return projects;
}

function parseStoredProjects(parsedArray) {
	const projectsArray = parsedArray.map((project) => {
		const projectObject = Object.assign(new Project(), project);
		const newTodos = projectObject.projectTodos.map((todo) => {
			const todoObject = Object.assign(new Todo(), todo);
			return todoObject;
		});
		projectObject.projectTodos.length = 0;
		newTodos.forEach((element) => {
			projectObject.projectTodos.push(element);
		});
		return projectObject;
	});
	projects.length = 0;
	projectsArray.forEach((element) => {
		projects.push(element);
	});
}

function checkForStorage() {
	const projectsStorage = Storage.getProjects();
	projectsStorage
		? parseStoredProjects(projectsStorage)
		: instantiateDefaultProjects();
}

function createNewProject(name) {
	const newProject = new Project();
	newProject.name = name;
	projects.push(newProject);
	Storage.setProjects(projects);
	return newProject;
}

function findTodoIdProject(todoId) {
	let projectFound = null;
	projects.forEach((project) => {
		const findTodo = project.findTodoById(todoId);
		if (findTodo) {
			projectFound = project;
			return;
		}
	});

	return projectFound;
}

function findTodoById(todoId) {
	let todoFound = null;
	projects.forEach((project) => {
		const findTodo = project.findTodoById(todoId);
		if (findTodo) {
			todoFound = findTodo;
			return;
		}
	});

	return todoFound;
}

function populateDates(date) {
	const renderTodos = [];
	projects.forEach((project) => {
		if (date === 'Today') {
			renderTodos.push(...project.filterByTodayDate());
		}
		if (date === 'Past Due') {
			renderTodos.push(...project.filterByPastDue());
		}
		if (date === 'Upcoming') {
			renderTodos.push(...project.filterByUpcoming());
		}
	});
	return renderTodos;
	console.log(projects);
}

function checkForProject(name) {
	const projectNamesArray = [];

	projects.forEach((element) => {
		projectNamesArray.push(element.name);
	});

	return projectNamesArray.includes(name);
}

function parseTodoForm() {
	const status = false;
	const title = document.getElementById('form-todo-title').value;
	const description = document.getElementById('form-todo-description').value;
	const notes = document.getElementById('form-todo-notes').value;
	const dueDate = document.getElementById('form-todo-date').value;
	const priority = document.getElementById('form-todo-priority').value;

	const todoTaskObject = new Todo(
		status,
		title,
		description,
		notes,
		dueDate,
		priority,
	);

	todoTaskObject.setdateFormatted();
	console.log(todoTaskObject);
	return todoTaskObject;
}

function checkForDateString(string) {
	if (string === 'Today' || string === 'Past Due' || string === 'Upcoming') {
		return true;
	}
	return false;
}

function getActiveProject(project) {
	if (checkForDateString(project)) {
		const result = projects.find(({ name }) => name === 'Inbox');
		return result;
	}

	const result = projects.find(({ name }) => name === project);
	return result;
}

function addTodoToProject(todo, currentProject) {
	const targetProject = getActiveProject(currentProject);
	if (targetProject) {
		targetProject.projectTodos.push(todo);
		Storage.setProjects(projects);
		console.log(targetProject);
	} else {
		console.log(`Project ${targetProject} not found`);
	}
}

function togglePriorityStatus(project, id) {
	const targetTodo = findTodoById(id);

	targetTodo.changePriority();

	const newPriorityStatus = targetTodo.priority;
	console.log();
	Storage.setProjects(projects);
	return newPriorityStatus;
}

function changeTodoStatus(projectPassed, id) {
	const targetTodo = findTodoById(id);
	targetTodo.changeStatus();
	const isStatusComplete = targetTodo.status;

	console.log(
		`${targetTodo} with the TODO id ${id} has been assigned status ${targetTodo.status}`,
	);

	if (isStatusComplete === true) {
		const project = findTodoIdProject(id);
		project.filterCompletedTodos();
		Storage.setProjects(projects);
		return true;
	}

	return false;
}

function parseEditForm() {
	const title = document.getElementById('edit-todo-title').value;
	const description = document.getElementById('edit-todo-description').value;
	const notes = document.getElementById('edit-todo-notes').value;
	const dueDate = document.getElementById('edit-todo-date').value;

	const editFormInfo = new Todo(false, title, description, notes, dueDate);
	editFormInfo.setdateFormatted();
	return editFormInfo;
}

function checkIfPropertyExists(source, target) {
	if (source === target || source === '') {
		return false;
	} else {
		return true;
	}
}

function editTodoInProject(project, todoId) {
	const todoTarget = findTodoById(todoId);
	const editForm = parseEditForm();

	if (checkIfPropertyExists(editForm.title, todoTarget.title)) {
		todoTarget.title = editForm.title;
	}
	if (checkIfPropertyExists(editForm.description, todoTarget.description)) {
		todoTarget.description = editForm.description;
	}
	if (checkIfPropertyExists(editForm.notes, todoTarget.notes)) {
		todoTarget.notes = editForm.notes;
	}
	if (checkIfPropertyExists(editForm.dueDate, todoTarget.dueDate)) {
		todoTarget.dueDate = editForm.dueDate;
	}
}

export {
	parseTodoForm,
	addTodoToProject,
	getActiveProject,
	togglePriorityStatus,
	instantiateDefaultProjects,
	changeTodoStatus,
	projects,
	checkForStorage,
	checkForProject,
	createNewProject,
	findTodoById,
	populateDates,
	editTodoInProject,
};
