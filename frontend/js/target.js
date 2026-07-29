import { GAME_CONFIG } from "./config.js";

/**
 * Represents a falling target inside the game arena.
 */
export class Target {
    /**
     * @param {HTMLElement} arena
     * @param {Function} onHit
     * @param {Function} onMiss
     */
    constructor(arena, onHit, onMiss) {
        this.arena = arena;
        this.onHit = onHit;
        this.onMiss = onMiss;

        this.element = document.createElement("button");
        this.element.className = "target";
        this.element.type = "button";
        this.element.setAttribute("aria-label", "Falling target");

        this.size = GAME_CONFIG.TARGET_SIZE;

        this.x = this.randomX();
        this.y = -this.size;

        this.speed = GAME_CONFIG.INITIAL_FALL_SPEED;

        this.active = true;

        this.render();

        this.element.addEventListener("click", () => this.hit());

        this.arena.appendChild(this.element);
    }

    /**
     * Returns a random horizontal position.
     *
     * @returns {number}
     */
    randomX() {
        const max =
            this.arena.clientWidth - GAME_CONFIG.TARGET_SIZE;

        return Math.floor(Math.random() * max);
    }

    /**
     * Updates the DOM position.
     */
    render() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    /**
     * Moves the target downward.
     *
     * @param {number} deltaTime
     */
    update(deltaTime) {
        if (!this.active) {
            return;
        }

        this.y += this.speed * deltaTime;

        this.render();

        if (
            this.y >
            this.arena.clientHeight
        ) {
            this.miss();
        }
    }

    /**
     * Called when the player clicks the target.
     */
    hit() {
        if (!this.active) {
            return;
        }

        this.active = false;

        this.destroy();

        this.onHit(this);
    }

    /**
     * Called when the target reaches the bottom.
     */
    miss() {
        if (!this.active) {
            return;
        }

        this.active = false;

        this.destroy();

        this.onMiss(this);
    }

    /**
     * Removes the target from the DOM.
     */
    destroy() {
        this.element.remove();
    }
}