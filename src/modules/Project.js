export default class Project {
   
    constructor(name){
    this.name = name
    this.projectTodos = []

   } 

   set name(value){
    if (value){
        this.name = value
    }
   }

   get name(){
    return this.name
   }

   get projectTodos(){
    return this.projectTodos
   }

   pushTodoToProject(todo){
    if (todo){
        this.projectTodos.push(todo)
    }
   }
}   
