import AppState from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";



export default class ScreenController {
    static init() {
        document.querySelector(".main-container").style.backgroundImage = `url(${background})`;
        document.querySelector(".logo").src = logo;
        document.querySelector(".button-add").addEventListener("click", () => ScreenController.displayItemCreator());
        this.modal = document.querySelector(".modal");
        this.modalSideBar = ScreenController.modal.querySelector(".side-bar");
        this.modalMainBar = ScreenController.modal.querySelector(".main-bar");
        this.ledgerSideBar = document.querySelector(".main-container .ledger .ledger-inner .side-bar");
        this.ledgerMainBar = document.querySelector(".main-container .ledger .ledger-inner .main-bar");
        this.updateScreen();
    }
    static updateScreen() {
        // this.modalSideBar.textContent = "TEST";
        this.ledgerSideBar.textContent = `${AppState.projectArray}`;
    }
    static displayItemCreator() {
        this.modal.showModal();
        this.modal.classList.add("ledger");
        this.modal.classList.add("heading");
        this.modal.classList.add("ledger-inner");

    }
    static displayItem() {
        // static createItem();
        // static addToSideBar();
    }

}