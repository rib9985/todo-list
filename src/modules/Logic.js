import Todo from './Todo';
import Project from './Project';
import Storage from './LocalStorage';

//

const projects = [];

function instantiateDefaultProjects() {
	const inbox = new Project('Inbox', []);
	const today = new Project('Today', []);
	const upcoming = new Project('Upcoming', []);
	const anytime = new Project('Anytime', []);

	projects.push(inbox, today, upcoming, anytime);
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
	console.log(todoTaskObject);
	return todoTaskObject;
}

function getActiveProject(project) {
	const result = projects.find(({ name }) => name === project);
	return result;
}

console.log(getActiveProject('Inbox'));

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
	const targetProject = getActiveProject(project);
	const targetTodo = targetProject.findTodoById(id);

	targetTodo.changePriority();

	const newPriorityStatus = targetTodo.priority;
	console.log(
		`${projects} with the TODO id ${id} has a new priority: ${newPriorityStatus}`,
	);
	Storage.setProjects(projects);
	return newPriorityStatus;
}

function changeTodoStatus(project, id) {
	const targetProject = getActiveProject(project);
	const targetTodo = targetProject.findTodoById(id);

	targetTodo.changeStatus();
	const isStatusComplete = targetTodo.status;

	console.log(
		`${targetTodo} with the TODO id ${id} has been assigned status ${targetTodo.status}`,
	);

	if (isStatusComplete === true) {
		targetProject.filterCompletedTodos();
		Storage.setProjects(projects);
		return true;
	}

	return false;
}

function createNewProject(name) {
	const newProject = new Project();
	newProject.name = name;
	projects.push(newProject);
	Storage.setProjects(projects);
	return newProject;
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
};
