import { Timer } from "./timer.js";
import { randomInteger } from "./utils.js";
import {
    clearArena,
    createTarget,
    getUIElements,
    positionTarget,
    setStartButtonDisabled,
    showArenaMessage,
    showGameOver,
    updateScore,
    updateTimer
} from "./ui.js";

const GAME_DURATION = 30;
const TARGET_SIZE = 70;

export class Game {
    constructor() {
        this.ui = getUIElements();

        this.state = {
            playerName: "",
            score: 0,
            isRunning: false,
            currentTarget: null
        };

        this.timer = new Timer({
            duration: GAME_DURATION,
            onTick: (seconds) => updateTimer(seconds),
            onComplete: () => this.end()
        });
    }

    start() {
        const playerName = this.ui.playerNameInput.value.trim();

        if (!playerName) {
            alert("Please enter your name before starting the game.");
            this.ui.playerNameInput.focus();
            return;
        }

        this.state.playerName = playerName;
        this.state.score = 0;
        this.state.isRunning = true;

        updateScore(0);
        updateTimer(GAME_DURATION);

        setStartButtonDisabled(true);

        clearArena();

        this.timer.reset();
        this.timer.start();

        this.spawnTarget();
    }

    spawnTarget() {
        if (!this.state.isRunning) {
            return;
        }

        clearArena();

        const target = createTarget(() => this.handleTargetClick());

        this.state.currentTarget = target;

        const arenaWidth = this.ui.arena.clientWidth;
        const arenaHeight = this.ui.arena.clientHeight;

        const left = randomInteger(0, arenaWidth - TARGET_SIZE);
        const top = randomInteger(0, arenaHeight - TARGET_SIZE);

        positionTarget(target, left, top);
    }

    handleTargetClick() {
        if (!this.state.isRunning) {
            return;
        }

        this.state.score++;

        updateScore(this.state.score);

        this.spawnTarget();
    }

    end() {
        this.state.isRunning = false;

        this.timer.stop();

        clearArena();

        showGameOver(
            this.state.playerName,
            this.state.score
        );

        setStartButtonDisabled(false);
    }
}