export class Timer {
    /**
     * @param {Object} options
     * @param {number} options.duration
     * @param {(seconds:number) => void} options.onTick
     * @param {() => void} options.onComplete
     */
    constructor({
        duration,
        onTick,
        onComplete
    }) {
        this.duration = duration;
        this.remainingSeconds = duration;
        this.intervalId = null;

        this.onTick = onTick;
        this.onComplete = onComplete;
    }

    start() {
        if (this.intervalId !== null) {
            return;
        }

        this.onTick(this.remainingSeconds);

        this.intervalId = window.setInterval(() => {
            this.remainingSeconds--;

            this.onTick(this.remainingSeconds);

            if (this.remainingSeconds <= 0) {
                this.stop();
                this.onComplete();
            }
        }, 1000);
    }

    stop() {
        if (this.intervalId === null) {
            return;
        }

        clearInterval(this.intervalId);
        this.intervalId = null;
    }

    reset() {
        this.stop();
        this.remainingSeconds = this.duration;
        this.onTick(this.remainingSeconds);
    }

    getRemainingSeconds() {
        return this.remainingSeconds;
    }

    isRunning() {
        return this.intervalId !== null;
    }
}