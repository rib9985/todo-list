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
}   
