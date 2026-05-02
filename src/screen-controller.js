import AppState, { proj } from "./app-state.js";
import "./styles.css";
import background from "./img/desk-background.webp";
import logo from "./img/squeshly-freezed-v2-transparent.png";

const mainContainer = document.querySelector(".main-container");
mainContainer.style.backgroundImage = `url(${background})`;
const logoImage = document.querySelector(".logo");
logoImage.src = logo;

export default class ScreenController {
    
}