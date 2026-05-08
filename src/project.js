import ToDo from "./to-do.js";

export default class Project {
    toDoArray = [];
    id = crypto.randomUUID();

    constructor(name) {
        this.name = name;
    }
    
    addToDo(title, description, date, priority) {
        this.toDoArray.push(new ToDo(title, description, date, priority));
    }
    removeToDo(toDo) {
        this.toDoArray.splice(this.toDoArray.indexOf(toDo, 0), 1);
    }
}