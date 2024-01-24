function addListeners(){
    const addTodoButton = document.getElementById('add-todo')
    addTodoButton.addEventListener('click',()=> createTodo())

    const removeTodoButton = document.getElementById('add-todo')
    removeTodoButton.addEventListener('click',()=> createTodo())


}