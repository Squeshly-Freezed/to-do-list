import AppState from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";



export default class ScreenController {
    static init() {
        document.querySelector(".main-container").style.backgroundImage = `url(${background})`;
        document.querySelector(".logo").src = logo;
        document.querySelector(".button-add").addEventListener("click", () => ScreenController.displayItemCreator());
        // document.querySelector(".button-go").addEventListener("submit", (event) => ScreenController.submitAddition(event)); 
        // document.querySelector(".button-go").addEventListener("submit", (event) => ScreenController.submitAddition(event)); 
        this.addToDoButton = document.querySelector(".button-add-todo")
        this.addToDoButton.addEventListener("focus", () => ScreenController.displayToDoCreator());
        this.addProjectButton = document.querySelector(".button-add-project")
        this.addProjectButton.addEventListener("focus", () => ScreenController.displayProjectCreator());;
        this.addNoteButton = document.querySelector(".button-add-note")
        this.addNoteButton.addEventListener("focus", () => ScreenController.displayNoteCreator());;
        this.modal = document.querySelector(".modal");
        this.modal.addEventListener("click", (event) => ScreenController.closeItemCreator(event));
        this.modal.classList.add("ledger");
        this.modal.classList.add("heading");
        this.modal.classList.add("ledger-inner");
        this.modalSideBar = ScreenController.modal.querySelector(".ledger-inner .side-bar");
        this.modalMainBar = ScreenController.modal.querySelector(".ledger-inner .main-bar");
        this.ledgerSideBar = document.querySelector(".main-container .ledger .ledger-inner .side-bar");
        this.ledgerMainBar = document.querySelector(".main-container .ledger .ledger-inner .main-bar");
        this.updateScreen();
    }
    static updateScreen() {
        this.displayProjects();
    }
    static displayItemCreator() {
        this.modal.showModal();
    }
    static displayToDoCreator() {
        this.modalMainBar.textContent = "";
        const form = Object.assign(document.createElement("form"), { className: "form", id: "form"});
        form.addEventListener("submit", (event) => ScreenController.submitAddition(event)); 
        this.modalMainBar.append(form);
        form.append(Object.assign(document.createElement("input"), { className: "title", placeholder: "Title:", required: true }));
        form.append(Object.assign(document.createElement("textarea"), { className: "description", placeholder: "Details:", style: "resize: none"}));
        form.append(Object.assign(document.createElement("label"), { className: "date-label", for: "date", title: "Select the date", textContent: "Due Date:"}));
        form.append(Object.assign(document.createElement("input"), { className: "date", id: "date", type: "date", required: true}));
        form.append(Object.assign(document.createElement("label"), { className: "priority-label", for: "priority", title: "Select the priority", textContent: "Priority:"}));
        form.append(Object.assign(document.createElement("div"), { className: "buttonWrapper" }));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("input"), { className: "radio-buttons", type: "radio", id: "priority-low", name: "radio", required: true}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("label"), { className: "low-button", htmlFor: "priority-low", textContent: "LOW"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("input"), { className: "radio-buttons", type: "radio", id: "priority-medium", name: "radio"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("label"), { className: "medium-button", htmlFor: "priority-medium", textContent: "MEDIUM"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("input"), { className: "radio-buttons", type: "radio", id: "priority-high", name: "radio"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("label"), { className: "high-button", htmlFor: "priority-high", textContent: "HIGH"}));
    }
    static displayProjectCreator() {
        this.modalMainBar.textContent = "test2";
    }
    static displayNoteCreator() {
        this.modalMainBar.textContent = "test3";
    }
    static closeItemCreator(event) {
        if (event.target === this.modal) this.modal.close();
    }
    static submitAddition(event) {
        event.preventDefault();
        const selectedTitle = this.modalMainBar.querySelector(".title").value;
        const selectedDescription = this.modalMainBar.querySelector(".description").value;
        const selectedDate = this.modalMainBar.querySelector(".date").value;
        const selectedPriority = this.modalMainBar.querySelector(".radio-buttons:checked");
        const selectedProject = AppState.selectedProject(0); // fix: make loop to select correct index
        selectedProject.addToDo(selectedTitle, selectedDescription, selectedDate, selectedPriority);
        AppState.saveToStorage();
        this.modal.close();
        this.updateScreen();
    }

    static displayProjects() {
        this.ledgerSideBar.textContent = "";
        for (let project of AppState.projectArray) {
            this.ledgerSideBar.textContent += `${project.name}\n`;
            for (let todo of project.toDoArray) {
                this.ledgerSideBar.textContent += `\t${todo.title}\n`;
            }
        }
    }
}