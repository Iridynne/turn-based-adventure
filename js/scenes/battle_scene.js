import { Sprite } from "../classes/sprite";

export class Battle {
    constructor({stage, allies = [], enemies = [], isBossFight = false}) {
        this.background = new Sprite(stage);
        this.allies = allies;
        this.enemies = enemies;

        this.isBossFight = isBossFight;
    }

    init() {
        
    }

    animate() {
        var frameId = requestAnimationFrame(this.animate());
    }
}