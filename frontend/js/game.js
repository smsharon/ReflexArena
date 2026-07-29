import { GAME_CONFIG } from "./config.js";
import { TargetManager } from "./targetManager.js";
import { Timer } from "./timer.js";

import {
    getUIElements,
    updateScore,
    updateTimer,
    showArenaMessage,
    setStartButtonDisabled,
    clearArena,
    showGameOver
} from "./ui.js";

export class Game {
    constructor() {
        this.ui = getUIElements();

        this.score = 0;
        this.running = false;

        this.lastFrame = 0;
        this.animationId = null;

        this.targetManager = null;

        this.timer = new Timer({
            duration: GAME_CONFIG.GAME_DURATION,

            onTick: (seconds) => {
                updateTimer(seconds);
            },

            onComplete: () => {
                this.win();
            }
        });
    }

    start() {
        const playerName = this.ui.playerNameInput.value.trim();

        if (!playerName) {
            alert("Please enter your name.");
            return;
        }

        this.playerName = playerName;

        this.score = 0;

        updateScore(0);
        this.timer.reset();

        clearArena();

        setStartButtonDisabled(true);

        this.running = true;

        this.targetManager = new TargetManager(
            this.ui.arena,
            this.handleTargetHit.bind(this),
            this.handleTargetMiss.bind(this)
        );

        this.targetManager.spawnWave();

        this.timer.start();

        this.lastFrame = performance.now();

        this.animationId = requestAnimationFrame(
            this.gameLoop.bind(this)
        );
    }

    gameLoop(timestamp) {
        if (!this.running) {
            return;
        }

        const deltaTime = (timestamp - this.lastFrame) / 1000;

        this.lastFrame = timestamp;

        this.targetManager.update(deltaTime);

        this.animationId = requestAnimationFrame(
            this.gameLoop.bind(this)
        );
    }

    handleTargetHit() {
        this.score++;

        updateScore(this.score);
    }

    handleTargetMiss() {
        this.lose();
    }

    win() {
        if (!this.running) {
            return;
        }

        this.end(
            `Congratulations ${this.playerName}!

You survived the full ${GAME_CONFIG.GAME_DURATION} seconds.

Final Score: ${this.score}`
        );
    }

    lose() {
        if (!this.running) {
            return;
        }

        this.end(
            `Game Over!

${this.playerName},

A target reached the bottom.

Final Score: ${this.score}`
        );
    }

    end(message) {
        this.running = false;

        cancelAnimationFrame(this.animationId);

        this.timer.stop();

        this.targetManager.clear();

        setStartButtonDisabled(false);

        showArenaMessage(message);
    }
}