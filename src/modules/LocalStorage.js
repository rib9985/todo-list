import { projects } from './Logic';
import Project from './Project';

export default class Storage {
	static setProjects(projectsArray) {
		const stringProjects = JSON.stringify(projectsArray);
		localStorage.setItem('projects', stringProjects);
	}

	static getProjects() {
		const parsedProjectsArray = JSON.parse(localStorage.getItem('projects'));
		if (!parsedProjectsArray) {
			return null;
		}
		console.log(parsedProjectsArray);
		return parsedProjectsArray;
	}

	static getProject(target) {
		if (typeof target === 'object') {
			target = this.name;
		}

		const storedProject = JSON.parse(localStorage.getItem(target));

		if (!storedProject) {
			return null;
		}

		return storedProject;
	}

	static deleteUserData() {
		localStorage.clear();
	}
}
