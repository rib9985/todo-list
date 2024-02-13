import * as logic from './Logic' 

export default class UI{

static addEventListeners(){
    const submitTodoButton = document.getElementById('submit-todo-button')
    const todoCheckbox = document.getElementById('todo-checkbox')
    const todoPriority = document.getElementById('div-todo-priority-icon')
    const sidebarProject = document.getElementById('sidebar-project')

    submitTodoButton.addEventListener('click', UI.handleFormElements(Event))
}

static getActiveProject(){
    const activeProject = document.getElementById('')

}

static changePriorityClass(){

}


static handleFormElements(Event){
    Event.preventDefault()
    logic.parseTodoForm()

}

}