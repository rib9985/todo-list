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


    dateFormatted(){
        if (!this.date){
            return 'YY/MM/DD'
        }

        const dateObject = new Date(this.dueDate)
        const formattedDate = dateObject.toLocaleDateString();
        return formattedDate
    }




}