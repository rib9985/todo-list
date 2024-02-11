import Todo from "./Todo";
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
    return todoTaskObject && myTodos.push(todoTaskObject)
}

// Push Todo to Project -> Returns Updated Project
function addTodoToProject(todo, project){
    const currentProject = this.project
    const todoName = this.todo

    currentProject.key = todoName
    currentProject.value = todo
    
    return currentProject
}

// Activate Project -> Returns Active Project
function getActiveProject (name){

    
    


}

// Edit Project -> Return Old Project, with new Name

// Retrieves a Todo by Name -> Returns Todo by Name

// Delete a Todo -> Returns Updated Project, without Todo

// Edit a Todo -> Returns Todo

// Assign Status -> Pushes Todo to Deleted Folder in Trash

// TODO: Temporary storage, research how this works with JSON
// Store Info