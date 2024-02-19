import { projects } from "./Logic"

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

   findTodoById(id){
    if (id){
      return this.projectTodos.find(todo => todo.id === id)
    }
    return console.log(`No ${id} found within ${this.name}`)
   }
  
   filterCompletedTodos(){
        this.projectTodos = this.projectTodos.filter((todo) => !todo.status)
   }
}   
