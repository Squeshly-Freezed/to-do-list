import AppState from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";
import Project from "./project.js";



export default class ScreenController {
    static init() {
        document.querySelector(".main-container").style.backgroundImage = `url(${background})`;
        document.querySelector(".logo").src = logo;
        document.querySelector(".button-add").addEventListener("click", () => ScreenController.displayItemCreator());
        this.addToDoButton = document.querySelector("#todo");
        this.addToDoButton.addEventListener("change", () => ScreenController.displayToDoCreator());
        this.addProjectButton = document.querySelector("#project");
        this.addProjectButton.addEventListener("change", () => ScreenController.displayProjectCreator());
        this.addNoteButton = document.querySelector("#note");
        this.addNoteButton.addEventListener("change", () => ScreenController.displayNoteCreator());
        this.modal = document.querySelector(".modal");
        this.modal.addEventListener("click", (event) => ScreenController.closeItemCreator(event));
        this.modal.classList.add("ledger");
        this.modal.classList.add("heading");
        this.modal.classList.add("ledger-inner");
        this.modalSideBar = ScreenController.modal.querySelector(".ledger-inner .side-bar");
        this.modalMainBar = ScreenController.modal.querySelector(".ledger-inner .main-bar");
        this.ledgerSideBar = document.querySelector(".main-container .ledger .ledger-inner .side-bar");
        this.ledgerMainBar = document.querySelector(".main-container .ledger .ledger-inner .main-bar");
        this.sideBarList = document.createElement("ul");
        this.sideBarList.addEventListener("click", (event) => ScreenController.showSelectedProject(event));
        this.displayItemsOnSideBar();
        this.displayItemsOnMainBar();
        this.sideBarList.firstElementChild.classList.add("selected");
    }

    static displayItemsOnSideBar() {
        this.sideBarList.textContent = "";
        this.ledgerSideBar.append(this.sideBarList);
        for (let project of AppState.projectArray) {
            this.sideBarList.append(Object.assign(document.createElement("li"), { className: "projectLi", textContent: `${project.name}\n` }));
        }
    }

    static displayItemsOnMainBar() {
        this.ledgerMainBar.textContent = "";
        for (let todo of AppState.getSelectedProject().toDoArray) {
            this.ledgerMainBar.append(Object.assign(document.createElement("div"), { className: "toDoDivs", textContent: `\t${todo.title}\n` }));  // create style for toDoDivs
        }
    }

    static showSelectedProject(event) {
        if (event.target !== event.currentTarget) {
            const previouslySelected = event.currentTarget.querySelector(".selected");
            if (previouslySelected) previouslySelected.classList.remove("selected");
            event.target.classList.add("selected");
            const chosenIndex = Array.from(event.currentTarget.children).indexOf(event.target);
            AppState.setSelectedProject(chosenIndex);
        }
        this.displayItemsOnMainBar();
        this.showEmptyProjectNotice();
    }
    //current
    static showEmptyProjectNotice() {
        if (AppState.getSelectedProject().toDoArray.length === 0) {
            const noticeHeader = Object.assign(document.createElement("div"), { className: "noticeHeader", textContent: "Empty Project"});
            const notice = Object.assign(document.createElement("div"), { className: "notice", textContent: "Add a To-Do, or delete unused Project."});
            const noticeButton = Object.assign(document.createElement("button"), { className: "noticeButton", textContent: "Delete"});
            this.ledgerMainBar.append(noticeHeader);
            this.ledgerMainBar.append(notice);
            this.ledgerMainBar.append(noticeButton);
        }
    }

    static displayItemCreator() {
        this.modal.showModal();
        ScreenController.displayToDoCreator();
    }

    static closeItemCreator(event) {
        if (event.target === this.modal) {
            this.modal.close();
            this.addToDoButton.checked = true;
        }
    }

    static displayToDoCreator() {
        this.modalMainBar.textContent = "";
        const form = Object.assign(document.createElement("form"), { className: "form", id: "form"});
        form.addEventListener("submit", (event) => ScreenController.submitToDo(event)); 
        this.modalMainBar.append(form);
        form.append(Object.assign(document.createElement("input"), { className: "title", placeholder: "Title:", required: true, maxLength: "18" }));
        form.append(Object.assign(document.createElement("textarea"), { className: "description", placeholder: "Details:", style: "resize: none", maxLength: "2500"}));
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
        this.modalMainBar.textContent = "";
        const form = Object.assign(document.createElement("form"), { className: "form", id: "form"});
        form.addEventListener("submit", (event) => ScreenController.submitProject(event));
        this.modalMainBar.append(form);
        form.append(Object.assign(document.createElement("input"), { className: "title", placeholder: "Name:", required: true, maxLength: "18"}));
    }

    static displayNoteCreator() {
        this.modalMainBar.textContent = "";
        const form = Object.assign(document.createElement("form"), { className: "form", id: "form"});
        form.addEventListener("submit", (event) => ScreenController.submitNote(event));
        this.modalMainBar.append(form);
        form.append(Object.assign(document.createElement("input"), { className: "title", placeholder: "Title:", required: true, maxLength: "18" }));
        form.append(Object.assign(document.createElement("textarea"), { className: "description", placeholder: "Details:", style: "resize: none", required: true, maxLength: "2500"}));
    }

    static submitToDo(event) {
        event.preventDefault();
        const selectedTitle = this.modalMainBar.querySelector(".title").value;
        const selectedDescription = this.modalMainBar.querySelector(".description").value;
        const selectedDate = this.modalMainBar.querySelector(".date").value;
        const selectedPriority = this.modalMainBar.querySelector(".radio-buttons:checked");
        AppState.getSelectedProject().addToDo(selectedTitle, selectedDescription, selectedDate, selectedPriority);
        this.saveAndClose();
    }

    static submitProject(event) {
        event.preventDefault();
        const selectedTitle = this.modalMainBar.querySelector(".title").value;
        AppState.addProject(new Project(selectedTitle));
        AppState.setSelectedProject(AppState.projectArray.length-1);
        this.saveAndClose();
    }

    static submitNote(event) {
        event.preventDefault();
        const selectedTitle = this.modalMainBar.querySelector(".title").value;
        const selectedDescription = this.modalMainBar.querySelector(".description").value;
        AppState.addNote();
        this.saveAndClose();
    }

    static saveAndClose() {
        AppState.saveToStorage();
        this.modal.close();
        this.addToDoButton.checked = true;
        this.displayItemsOnSideBar();
        this.displayItemsOnMainBar();
        this.sideBarList.children[AppState.selectedProjectIndex].classList.add("selected");
    }
}