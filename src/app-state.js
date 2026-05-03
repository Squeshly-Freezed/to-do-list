import Project from "./project.js";
import ToDo, { Priority } from "./to-do.js";
import Note from "./note.js";

export default class AppState {
    static projectArray = [];
    static noteArray = [];

    static init() {
        if (!this.isPastVisitor()) {
            this.setVisitorFlag();
            this.addDefaultProject();
        }
        else {
            //load from storage
        }
    }
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
    static isPastVisitor() {
        if (localStorage.getItem("hasVisited")) return true;
    }
    static setVisitorFlag() {
        localStorage.setItem("hasVisited", "true");
    }
    static addDefaultProject() {
        this.addProject(new Project("Home"));
    }
}