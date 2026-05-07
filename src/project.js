export default class Project {
    toDoArray = [];
    id = crypto.randomUUID();

    constructor(name) {
        this.name = name;
    }
    
    addToDo(toDo) {
        this.toDoArray.push(toDo);
    }
    removeToDo(toDo) {
        this.toDoArray.splice(this.toDoArray.indexOf(toDo, 0), 1);
    }
}