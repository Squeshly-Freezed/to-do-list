import Project from "./project.js";
import ToDo, { Priority } from "./to-do.js";
import Note from "./note.js";

export default class AppState {
    static projectArray = [];
    static noteArray = [];

    static addProject(project) {
        this.projectArray.push(project);
    }
    static removeProject(project) {
        this.projectArray.splice(this.projectArray.indexOf(project, 0), 1);
    }
    static addNote(note) {
        this.noteArray.push(note);
    }
    static removeNote(note) {
        this.noteArray.splice(this.noteArray.indexOf(note, 0), 1);
    }
    static hasVisited() {
        if (!localStorage.getItem("hasVisited")) {
            localStorage.setItem("hasVisited", "true");
            return false;
        }
        return true;
    }
    static addDefaultProject() {
        if (!this.hasVisited()) {
            this.addProject(new Project("Home"));
        }
    }
}