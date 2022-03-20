export class FramesCounter {
    currentSecond = 0;
    frameCount = 0;
    framesLastSecond = 0;

    constructor(context, displayX, displayY, displayColor) {
        this.context = context;
        this.displayX = displayX;
        this.displayY = displayY;
        this.displayColor = displayColor;
    }

    #calculateFPS() {
        var sec = Math.floor(Date.now()/1000);

        if(sec != this.currentSecond) {
            this.currentSecond = sec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        }
        else {
            this.frameCount++;
        }
    }

    display() {
        this.#calculateFPS();

        this.context.fillStyle = this.displayColor;
        this.context.fillText("FPS: " + this.framesLastSecond, this.displayX, this.displayY);
    }
}