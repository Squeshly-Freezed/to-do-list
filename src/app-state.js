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