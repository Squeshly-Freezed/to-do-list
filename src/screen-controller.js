import AppState from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";



export default class ScreenController {
    static init() {
        document.querySelector(".main-container").style.backgroundImage = `url(${background})`;
        document.querySelector(".logo").src = logo;
        document.querySelector(".button-add").addEventListener("click", () => ScreenController.displayItemCreator());
        // document.querySelector(".button-go").addEventListener("click", () => ScreenController.submitAddition()); 
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
        this.modalMainBar.textContent = "test1";
        this.modalMainBar.append(document.createElement("form"));
        this.modalMainBar.append(Object.assign(document.createElement("input"), { className: "title", placeholder: "Title:" }));
        this.modalMainBar.append(Object.assign(document.createElement("textarea"), { className: "description", placeholder: "Details:", style: "resize: none"}));
        this.modalMainBar.append(Object.assign(document.createElement("label"), { className: "date-label", for: "date", title: "Select the date", textContent: "Due Date:"}));
        this.modalMainBar.append(Object.assign(document.createElement("input"), { className: "date", id: "date", type: "date"}));
        this.modalMainBar.append(Object.assign(document.createElement("label"), { className: "priority-label", for: "priority", title: "Select the priority", textContent: "Priority:"}));
        this.modalMainBar.append(Object.assign(document.createElement("div"), { className: "buttonWrapper" }));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("input"), { type: "radio", id: "priority-low", name: "radio"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("label"), { className: "low-button", htmlFor: "priority-low", textContent: "LOW"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("input"), { type: "radio", id: "priority-medium", name: "radio"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("label"), { className: "medium-button", htmlFor: "priority-medium", textContent: "MEDIUM"}));
        document.querySelector(".buttonWrapper").append(Object.assign(document.createElement("input"), { type: "radio", id: "priority-high", name: "radio"}));
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
    static submitAddition() {

    }

    static displayProjects() {
        for (let index = 0; index < AppState.projectArray.length; index++) {
            this.ledgerSideBar.textContent += `\n${AppState.projectArray[index].name}`;
        }
    }
}