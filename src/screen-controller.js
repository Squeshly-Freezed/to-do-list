import AppState from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";



export default class ScreenController {
    static init() {
        document.querySelector(".main-container").style.backgroundImage = `url(${background})`;
        document.querySelector(".logo").src = logo;
        document.querySelector(".button-add").addEventListener("click", () => ScreenController.displayItemCreator());
        this.addToDoButton = document.querySelector(".button-add-todo").addEventListener("focus", () => ScreenController.displayToDoCreator());
        this.addProjectButton = document.querySelector(".button-add-project").addEventListener("focus", () => ScreenController.displayProjectCreator());;
        this.addNoteButton = document.querySelector(".button-add-note").addEventListener("focus", () => ScreenController.displayNoteCreator());;
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
        // this.modalMainBar.textContent = "test";
    }
    static displayToDoCreator() {
        this.modalMainBar.textContent = "test1";
        this.modalMainBar.append(document.createElement("form"));
        this.modalMainBar.append(Object.assign(document.createElement("input"), { className: "title", placeholder: "Title:" }));
        this.modalMainBar.append(Object.assign(document.createElement("input"), { className: "description", placeholder: "Details:" }));
        this.modalMainBar.append()
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
    static displayProjects() {
        for (let index = 0; index < AppState.projectArray.length; index++) {
            this.ledgerSideBar.textContent += `\n${AppState.projectArray[index].name}`;
        }
    }
}