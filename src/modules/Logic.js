import Todo from "./Todo";
import Project from "./Project"

//

const projects = []

function instantiateDefaultProjects (){
    const inbox = new Project('Inbox', [])
    const today = new Project('Today', [])
    const upcoming = new Project('Upcoming', [])
    const anytime = new Project('Anytime', [])

    projects.push(inbox, today, upcoming, anytime)
    return projects
}


// Parse todo form -> Returns Todo Task Object

function parseTodoForm(){
    const status = false
    const title = document.getElementById('form-todo-title').value
    const description = document.getElementById('form-todo-description').value
    const notes = document.getElementById('form-todo-notes').value
    const dueDate = document.getElementById('form-todo-date').value
    const priority = document.getElementById('form-todo-priority').value

    const todoTaskObject = new Todo(status, title, description, notes, dueDate, priority)
    return todoTaskObject 
}

// Activate Project -> Returns Active Project

function getActiveProject (project){
   const result = projects.find(( { name }) => name === project   )
   return result
}

console.log (getActiveProject('Inbox'))

function addTodoToProject(todo, currentProject){
   const targetProject = getActiveProject(currentProject)
   if (targetProject){
    targetProject.projectTodos.push(todo)
   } 
   else{
    console.log(`Project ${targetProject} not found`)
   }
}

export {parseTodoForm, addTodoToProject,getActiveProject, instantiateDefaultProjects, projects}
// TODO: Temporary storage, research how this works with JSON
// Store Info