import { Sprite } from "./sprite.js";

export class Character extends Sprite {
    constructor({
        position = {x:0, y:0}, 
        image, 
        frames = {max: 1, hold: 10}, 
        animate = false,
        name,
        health,
        attacks,
        isEnemy = false
    }) {
        super({position, image, frames, animate});

        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attacks = attacks;
        this.isEnemy = isEnemy;
    }

    faint() {
        gsap.to(this.position, {
            x: this.position.x + 20
        });
        gsap.to(this, {
            opacity: 0
        });
    }

    attack({attack, recipient, renderedSprites}) {

    }
}