import Todo from "./Todo";
import Project from "./Project"

//

const projects = []


// Parse todo form -> Returns Todo Task Object

function parseTodoForm(){
    const title = document.getElementById('todo-form-title').value
    const description = document.getElementById('todo-form-description').value
    const complete = document.getElementById('todo-form-complete').value
    const dueDate = document.getElementById('todo-form-dueDate').value
    const priority = document.getElementById('todo-form-priority').value

    const todoTaskObject = new Todo(title, description, complete, dueDate,priority)
    console.log(todoTaskObject) 
    return todoTaskObject 
}

// Push Todo to Project -> Returns Updated Project
function addTodoToProject(todo, project){
    project.pushTodoToProject(todo)
    return project
}

// Activate Project -> Returns Active Project
function getActiveProject (name){
    return projects.find(name)
}


export {parseTodoForm, addTodoToProject,getActiveProject, projects}
// TODO: Temporary storage, research how this works with JSON
// Store Info