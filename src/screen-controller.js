import AppState, { proj } from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";



export default class ScreenController {
    static init() {
        document.querySelector(".main-container").style.backgroundImage = `url(${background})`;
        document.querySelector(".logo").src = logo;
        document.querySelector(".button-add").addEventListener("click", ScreenController.displayItemCreation);
    }
    static displayItemCreation() {
        const modal = document.createElement("dialog");
        modal.classList.add("modal");
        document.body.appendChild(modal);
        modal.showModal();
    }
    static displayItem() {
        // static createItem();
        // static addToSideBar();
    }

}