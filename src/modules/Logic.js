import Todo from "./Todo";
//
const myTodos = []


// Define a function to parse todo form

function parseTodoForm(){
    const title = document.getElementById('todo-form-title').value
    const description = document.getElementById('todo-form-description').value
    const complete = document.getElementById('todo-form-complete').value
    const dueDate = document.getElementById('todo-form-dueDate').value
    const priority = document.getElementById('todo-form-priority').value

    const todoTaskObject = new Todo(title, description, complete, dueDate,priority)
    return todoTaskObject && myTodos.push(todoTaskObject)
}

