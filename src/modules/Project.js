export default class Project {
   
    constructor(name){
    this.name = name
    this.projectTodos = []

   } 
 
   pushTodoToProject(todo){
    if (todo){
        this.projectTodos.push(todo)
    }
   }

   findTodoByTitle (todoTitle){
    if (todoTitle){
      return this.projectTodos.find(todo => todo.title === todoTitle)
    }
    return console.log(`No ${todoTitle} found within ${this.name}`)
   }

   
}   
