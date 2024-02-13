export default class Todo{

    // This creates the initial object of the todo
    constructor(status, title, description, notes, dueDate, priority){
        this.status= status
        this.description=description
        this.title=title
        this.notes =notes
        this.dueDate = dueDate
        this.priority=priority
    }

    // Getters & Setters of Todo
    set title(title){
        this.title = title
    }

    get title(){
        return this.title
    }


    set description(description){
        this.description = description
    }

    get description(){
        return this.description
    }

    set notes(notes){
        this.notes = notes
    }

    get notes (){
        return this.notes
    }
    
    set status(status){
        if (status === true){
            this.status = true
        }
        else {
            this.status = false
        }
    }

    set dueDate(dueDate){
        this.dueDate = dueDate
    }

   get dueDate(){
    return this.dueDate
   }
 
    set priority(priority){
        this.priority = priority
    }

    get priority(){
        return this.priority
    }

    get dateFormatted(){
        if (!this.date){
            return 'YY/MM/DD'
        }

        const dateObject = new Date(this.dueDate)
        const formattedDate = dateObject.toLocaleDateString();
        return formattedDate
    }




}