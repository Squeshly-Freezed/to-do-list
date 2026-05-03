import AppState from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";



export default class ScreenController {
    static init() {
        document.querySelector(".main-container").style.backgroundImage = `url(${background})`;
        document.querySelector(".logo").src = logo;
        document.querySelector(".button-add").addEventListener("click", ScreenController.displayItemCreator);
        ScreenController.modal = document.querySelector(".modal");
    }
    static displayItemCreator() {
        ScreenController.modal.showModal();
        ScreenController.modal.classList.add("modal");
        ScreenController.modal.classList.add("ledger");
        ScreenController.modal.classList.add("heading");
        ScreenController.modal.classList.add("ledger-inner");
        const sideBar = ScreenController.modal.querySelector(".side-bar");
        const mainBar = ScreenController.modal.querySelector(".main-bar");
        // sideBar.textContent = "poo";
    }
    static displayItem() {
        // static createItem();
        // static addToSideBar();
    }

}