import { Game } from "./game.js";
import {
    getUIElements,
    showArenaMessage,
    updateScore,
    updateTimer
} from "./ui.js";

document.addEventListener("DOMContentLoaded", initializeApplication);

/**
 * Initializes the application after the DOM has loaded.
 */
function initializeApplication() {
    const game = new Game();
    const ui = getUIElements();

    updateScore(0);
    updateTimer(30);

    showArenaMessage("Click Start Game to begin.");

    ui.startButton.addEventListener("click", () => {
        game.start();
    });
}