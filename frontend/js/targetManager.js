import { GAME_CONFIG } from "./config.js";
import { Target } from "./target.js";

/**
 * Manages all active targets in the game.
 */
export class TargetManager {
    /**
     * @param {HTMLElement} arena
     * @param {Function} onTargetHit
     * @param {Function} onTargetMiss
     */
    constructor(arena, onTargetHit, onTargetMiss) {
        this.arena = arena;
        this.onTargetHit = onTargetHit;
        this.onTargetMiss = onTargetMiss;

        this.targets = [];
    }

    /**
     * Creates a new wave of falling targets.
     */
    spawnWave() {
        this.targets = [];

        for (let index = 0; index < GAME_CONFIG.TARGETS_PER_WAVE; index++) {
            const target = new Target(
                this.arena,
                this.handleTargetHit.bind(this),
                this.handleTargetMiss.bind(this)
            );

            this.targets.push(target);
        }
    }

    /**
     * Updates every active target.
     *
     * @param {number} deltaTime
     */
    update(deltaTime) {
        for (const target of this.targets) {
            target.update(deltaTime);
        }
    }

    /**
     * Handles a successful click.
     *
     * @param {Target} target
     */
    handleTargetHit(target) {
        this.targets = this.targets.filter(item => item !== target);

        this.onTargetHit();

        if (this.targets.length === 0) {
            this.spawnWave();
        }
    }

    /**
     * Handles a missed target.
     */
    handleTargetMiss() {
        this.clear();

        this.onTargetMiss();
    }

    /**
     * Removes all active targets.
     */
    clear() {
        for (const target of this.targets) {
            target.destroy();
        }

        this.targets = [];
    }
}