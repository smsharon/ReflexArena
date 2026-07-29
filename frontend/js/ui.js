import {
    clearElement,
    createElement,
    getElement
} from "./utils.js";

const elements = {
    playerNameInput: getElement("player-name"),
    startButton: getElement("start-game"),
    score: getElement("score"),
    timer: getElement("timer"),
    arena: getElement("game-arena"),
    leaderboard: getElement("leaderboard-body")
};

/**
 * Returns cached DOM elements.
 *
 * @returns {Object}
 */
export function getUIElements() {
    return elements;
}

/**
 * Updates the displayed score.
 *
 * @param {number} score
 */
export function updateScore(score) {
    elements.score.textContent = score;
}

/**
 * Updates the displayed timer.
 *
 * @param {number} seconds
 */
export function updateTimer(seconds) {
    elements.timer.textContent = seconds;
}

/**
 * Enables or disables the Start Game button.
 *
 * @param {boolean} disabled
 */
export function setStartButtonDisabled(disabled) {
    elements.startButton.disabled = disabled;
}

/**
 * Clears every target from the arena.
 */
export function clearArena() {
    clearElement(elements.arena);
}

/**
 * Displays the default arena message.
 */
export function showArenaMessage(message) {
    clearArena();

    const messageElement = createElement("p", {
        className: "arena-message",
        text: message
    });

    elements.arena.appendChild(messageElement);
}

/**
 * Creates a clickable target.
 *
 * @param {Function} onClick
 * @returns {HTMLElement}
 */
export function createTarget(onClick) {
    const target = createElement("button", {
        className: "target"
    });

    target.type = "button";
    target.setAttribute("aria-label", "Reaction target");
    target.addEventListener("click", onClick);

    elements.arena.appendChild(target);

    return target;
}

/**
 * Positions a target inside the arena.
 *
 * @param {HTMLElement} target
 * @param {number} left
 * @param {number} top
 */
export function positionTarget(target, left, top) {
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
}

/**
 * Displays the final game message.
 *
 * @param {string} playerName
 * @param {number} score
 */
export function showGameOver(playerName, score) {
    showArenaMessage(
    `Game Over!

    Well done, ${playerName}!

    Final Score: ${score}

    Click Start Game to play again.`
    );
}