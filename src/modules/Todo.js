export default class Todo{

    // This creates the initial object of the todo
    constructor(title, description, complete, dueDate, priority){
        this.title=title
        this.description=description
        this.complete= complete
        this.dueDate = dueDate
        this.priority=priority
    }

    // Getters & Setters of Todo
    assignTitle(title){
        this.title = title
    }

    assignDescription(description){
        this.description = description
    }

    assignCompleteStatus(complete){
        if (complete === true){
            this.complete = true
        }
        else {
            this.complete = false
        }
    }

    assignDueDate(dueDate){
        this.dueDate = dueDate
    }

    assignPriority(priority){
        this.priority = priority
    }

    getTitle(){
        return this.title
    }

    getDueDate(){
        return this.date
    }

    getDateFormatted(){
        if (!this.date){
            return 'YY/MM/DD'
        }

        const dateObject = new Date(this.dueDate)
        const formattedDate = dateObject.toLocaleDateString();
        return formattedDate
    }




}