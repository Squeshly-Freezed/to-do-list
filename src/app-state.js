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
            this.saveToStorage();
        }
        else {
            this.loadFromStorage();
            this.hydrateProjects();
        }
    }
    static addProject(project) {
        this.projectArray.push(project);
    }
    static removeProject(project) {
        this.projectArray.splice(this.projectArray.indexOf(project, 0), 1);
    }
    static selectedProject(index) {
        return this.projectArray[index];
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
    static saveToStorage() {
        localStorage.setItem("projects", JSON.stringify(this.projectArray));
        localStorage.setItem("notes", JSON.stringify(this.noteArray));
    }
    static loadFromStorage() {
        this.projectArray = JSON.parse(localStorage.getItem("projects")) ?? "";
        this.noteArray = JSON.parse(localStorage.getItem("notes")) ?? "";
    }
    static hydrateProjects() {
        for (let index = 0; index < this.projectArray.length; index++) {
            this.projectArray[index] = Object.assign(new Project(), this.projectArray[index]);
        }
    }
}