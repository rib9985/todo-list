import * as logic from './Logic' 
import * as Component from './'
export default class UI{

static elementIds(){
    
}

static addEventListeners(){
    const formSubmitTodo = document.getElementById('form-submit-todo')
    const todoCheckbox = document.getElementById('todo-checkbox')
    const todoPriority = document.getElementById('div-todo-priority-icon')
    const sidebarProject = document.getElementById('sidebar-project')

    formSubmitTodo.addEventListener('submit', (event) => {UI.handleTodoForm(event)})
}

static getActiveProject(){
    const activeProject = document.getElementById('div-current-project').innerHTML
    console.log(`Current Active Project is ${activeProject}`)
    return activeProject
}

static changePriorityClass(){

}

static clearProjectUI(){
    const todosDiv
}


static handleTodoForm(Event){
    Event.preventDefault()
    const currentProject = UI.getActiveProject() 
    const todo = logic.parseTodoForm()

    logic.addTodoToProject(todo,currentProject)
}

static intializeUI(){
    UI.addEventListeners()
}



static createTodoComponent(){


}