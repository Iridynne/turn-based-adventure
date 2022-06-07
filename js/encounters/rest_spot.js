import { Sprite } from "../classes/sprite.js";
import { CAMPFIRE } from "../constants/stages.js";
import * as ui from "../ui.js"

export class RestSpot {

    constructor(stage, allies) {
        this.stage = {
            background: new Sprite(stage)
        };
        this.allies = allies;
        this.campfire = new Sprite(CAMPFIRE);

        this.animate = this.animate.bind(this);
    }

    #animationFrame;
    animate() {
        this.#animationFrame = requestAnimationFrame(this.animate);

        this.stage.background.draw();
        this.allies.forEach(ally => ally.draw());
        this.campfire.draw();
    }

    start() {
        ui.hideTransition();

        this.animate();
    }
}