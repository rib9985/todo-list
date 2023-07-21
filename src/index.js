import Todo from "./modules/Todo";

const todoOne = new Todo('test', 'this is a test', false, null, 'high');
const todoSelector = document.getElementById('todo-test');
const todoTitleInput = document.getElementById('todo-title-input');

function updateTodoTitle(selector, input) {
    todoOne.assignTitle(input.value);
    selector.innerHTML = todoOne.title;
    console.log(todoOne)
}

function clearForm(text){
    return text.value = ''
}

const titleForm = document.getElementById('todo-post');
titleForm.onsubmit = (event) => {
    event.preventDefault();
    updateTodoTitle(todoSelector, todoTitleInput);
    clearForm(todoTitleInput)
};

todoSelector.innerText = todoOne.title
