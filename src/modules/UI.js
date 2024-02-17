import * as logic from './Logic' 



export default class UI{

static idsDom(){
}

static addEventListeners(){
    const formSubmitTodo = document.getElementById('form-submit-todo')
    const todoCheckbox = document.getElementById('todo-checkbox')
    const todoPriority = document.getElementsByClassName('div-todo-priority')
    const sidebarProject = document.getElementById('sidebar-project')

    formSubmitTodo.addEventListener('submit', (event) => {UI.handleTodoForm(event)})
}

static getActiveProject(){
    const activeProject = document.getElementById('div-current-project').innerHTML
    console.log(`Current Active Project is ${activeProject}`)
    return activeProject
}


static clearProjectUI(){
   const divTodoList = document.getElementById('todo-list')
   divTodoList.innerHTML = ''

}


static handleTodoForm(Event){
    Event.preventDefault()
    const currentProject = UI.getActiveProject() 
    const todo = logic.parseTodoForm()

    logic.addTodoToProject(todo,currentProject)
    UI.createTodoComponent(todo.title, todo.notes, todo.description, todo.dueDate, todo.priority)
}

static intializeUI(){
}



static createTodoComponent(title, description, notes, dueDate, priority){
   const divTodoList = document.getElementById('todo-list')
   const todoComponentHTML = 
    `<div class="todo"> 
            <div id="div-todo-component">
                <input type="checkbox" id="todo-checkbox">
                <label for="todo-checkbox" id="todo-checkbox-label">
                <div id="div-todo-title">${title}</div>
                <div id="div-todo-description">${description}</div>
                <div id="div-todo-notes">${notes}</div>
                <div id="div-todo-date">${dueDate}</div>
        </label>
                <button id="todo-priority-${priority}" class="material-symbols-outlined button-todo-priority">priority_high</button>
                <button id="div-todo-edit-icon" class="material-symbols-outlined">edit</button>
            </div>
    </div>`

    divTodoList.insertAdjacentHTML('beforeend', todoComponentHTML);

    const todoComponents = document.querySelectorAll('.todo');
    const lastTodoComponent = todoComponents[todoComponents.length - 1];
    const buttonTodoPriority = lastTodoComponent.querySelector('.button-todo-priority');

    buttonTodoPriority.addEventListener('click', function() {
        const newPriorityStatus = logic.togglePriorityStatus(UI.getActiveProject(), title);
        this.id = `todo-priority-${newPriorityStatus}`; // Update the button's id
})




}}