import AppState from "./app-state.js";
import Project from "./project.js";
import ToDo from "./to-do.js";
import { Priority } from "./to-do.js";
import Note from "./note.js";

export default class ScreenController {
    log() {
        console.log(proj);
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