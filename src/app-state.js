import Project from "./project.js";
import ToDo, { Priority } from "./to-do.js";
import Note from "./note.js";

export default class AppState {
    static projectArray = [];
    static noteArray = [];

    addProject(project) {
        this.projectArray.push(project);
    }
    removeProject(project) {
        this.projectArray.splice(this.projectArray.indexOf(project, 0), 1);
    }
    addNote(note) {
        this.noteArray.push(note);
    }
    removeNote(note) {
        this.noteArray.splice(this.noteArray.indexOf(note, 0), 1);
    }
}

const toDo1 = new ToDo(111, 111, 111, 111);
const toDo2 = new ToDo(222, 222, 222, 222);
const toDo3 = new ToDo(333, 333, 333, 333);
const proj = new Project("pro1");
toDo1.priority = Priority.LOW
proj.addToDo(toDo1);
proj.addToDo(toDo2);
proj.addToDo(toDo3);