import AppState from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";
import Project from "./project.js";
import { format, parseISO } from "date-fns";

const formatDate = (dueDate) => format(parseISO(dueDate), "d MMM");

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
        this.detailsModal = Object.assign(document.createElement("dialog"), { className: "detailsModal" });
        this.detailsModal.addEventListener("click", this.detailsModal.close);
        document.body.append(this.detailsModal);
        this.modal = document.querySelector(".modal");
        this.modal.addEventListener("click", (event) => ScreenController.closeItemCreator(event));
        this.modal.classList.add("ledger");
        this.modal.classList.add("heading");
        this.modal.classList.add("ledger-inner");
        this.modalSideBar = ScreenController.modal.querySelector(".ledger-inner .side-bar");
        this.modalMainBar = ScreenController.modal.querySelector(".ledger-inner .main-bar");
        this.ledgerSideBar = document.querySelector(".main-container .ledger .ledger-inner .side-bar");
        this.ledgerMainBar = document.querySelector(".main-container .ledger .ledger-inner .main-bar");
        this.ledgerMainBar.addEventListener("change", (event) => ScreenController.completeToDo(event));
        this.ledgerMainBar.addEventListener("click", (event) => ScreenController.deleteToDo(event));
        this.ledgerMainBar.addEventListener("click", (event) => ScreenController.detailToDo(event));
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
        if (AppState.getSelectedProject().toDoArray.length > 0) {
            for (let todo of AppState.getSelectedProject().toDoArray) {
                const toDoDivs = Object.assign(document.createElement("div"), { className: "toDoDivs", textContent: todo.title, id: todo.id });
                this.ledgerMainBar.append(toDoDivs);
                const titleBox = Object.assign(document.createElement("div"), { className: "titleBox", textContent: todo.title });
                const doneBox = Object.assign(document.createElement("input"), { type: "checkbox", className: "doneBox", checked: todo.completionStatus });
                const dateBox = Object.assign(document.createElement("div"), { className: "dateBox", textContent: formatDate(todo.dueDate) });
                const detailsBox = Object.assign(document.createElement("button"), { className: "detailsBox", textContent: "Details" });
                const binWrapper = Object.assign(document.createElement("div"), { className: "binWrapper" });
                binWrapper.innerHTML = 
                    `<svg fill="red" width="1em" height="1em" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42,3H28a2,2,0,0,0-2-2H22a2,2,0,0,0-2,2H6A2,2,0,0,0,6,7H42a2,2,0,0,0,0-4Z"/>
                    <path d="M39,9a2,2,0,0,0-2,2V43H11V11a2,2,0,0,0-4,0V45a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V11A2,2,0,0,0,39,9Z"/>
                    <path d="M21,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/>
                    <path d="M31,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z"/>
                    </svg>`
                const binSVG = binWrapper.firstElementChild;    //finish
                binSVG.classList.add("binSVG");
                toDoDivs.append(titleBox);
                toDoDivs.prepend(doneBox);
                toDoDivs.append(detailsBox);
                toDoDivs.append(dateBox);
                toDoDivs.append(binSVG);
            }
        }
    }

    static completeToDo(event) {
        if (event.target.classList.contains("doneBox")) {
            for (let todo of AppState.getSelectedProject().toDoArray) {
                if (event.target.closest(".toDoDivs").id === todo.id) {
                    todo.changeCompletionStatus();
                    AppState.saveToStorage();
                }
            }
        }
    }

    static deleteToDo(event) {
        if (event.target.classList.contains("binSVG")) {
            for (let todo of AppState.getSelectedProject().toDoArray) {
                if (event.target.closest(".toDoDivs").id === todo.id) {
                    AppState.getSelectedProject().removeToDo(todo);
                    AppState.saveToStorage();
                    this.displayItemsOnMainBar();
                }
            }
        }
    }

    static detailToDo(event) {
        if (event.target.classList.contains("detailsBox")) {
            for (let todo of AppState.getSelectedProject().toDoArray) {
                if (event.target.closest(".toDoDivs").id === todo.id) {
                    this.detailsModal.showModal();
                    this.detailsModal.textContent = todo.description;
                }
            }
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
    
    static showEmptyProjectNotice() {
        if (AppState.getSelectedProject().toDoArray.length === 0) {
            const noticeHeader = Object.assign(document.createElement("div"), { className: "noticeHeader", textContent: "Empty Project"});
            const notice = Object.assign(document.createElement("div"), { className: "notice", textContent: "Add a To-Do, or delete unused Project."});
            const noticeButton = Object.assign(document.createElement("button"), { className: "noticeButton", textContent: "Delete"});
            noticeButton.addEventListener("click", () => ScreenController.deleteProject());
            this.ledgerMainBar.append(noticeHeader);
            this.ledgerMainBar.append(notice);
            this.ledgerMainBar.append(noticeButton);
        }
    }

    static deleteProject() {
        AppState.removeProject(AppState.getSelectedProject());
        AppState.setSelectedProject(0);
        this.saveAndClose();
    }

    static displayItemCreator() {
        this.modal.showModal();
        this.displayToDoCreator();
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
        form.append(Object.assign(document.createElement("input"), { className: "title", placeholder: "Title:", required: true, maxLength: "12" }));
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
        this.sideBarList.firstElementChild.classList.add("selected");
    }
}