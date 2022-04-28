import { TYPE } from "../constants/attacks/attacks.js";
import { Sprite } from "./sprite.js";

const ctx = document.querySelector("canvas").getContext("2d");

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
            x: this.isEnemy? this.position.x + 20 : this.position.x - 20
        });
        gsap.to(this, {
            opacity: 0
        });
    }

    attack({attack, target}) {
        switch(attack.type) {
            case TYPE.PHYSICAL:
                gsap.to(this.position, {
                    x: this.isEnemy? target.position.x + 32 : target.position.x - 32,
                    yoyo: true,
                    repeat: 1,
                    duration: 0.5
                });
                gsap.to(target, {
                    delay: 0.25,
                    duration: 0.25,
                    health: Math.max(target.health - attack.damage, 0),
                    onComplete() {
                        if(target.health == 0) {
                            target.faint();
                        }
                    }
                });
                gsap.to(target, {
                    opacity: 0,
                    yoyo: true,
                    repeat: 5,
                    delay: 0.25,
                    duration: 0.1
                })

                break;

            case TYPE.MAGICAL:
                var projectile = new Sprite({
                    image: attack.image,
                    position: {
                        ...this.position, 
                        x: this.isEnemy? this.position.x - 32 : this.position.x + 32
                    }
                });

                // Projectile Animation
                gsap.to(projectile.position, {
                    x: this.isEnemy? target.position.x + 32 : target.position.x - 32,
                    duration: 0.5,
                    onUpdate() {
                        projectile.draw(ctx);
                    }
                });

                // Impact Animation
                gsap.to(target, {
                    opacity: 0,
                    yoyo: true,
                    repeat: 5,
                    delay: 0.5,
                    duration: 0.1
                })

                // Health Animation
                gsap.to(target, {
                    delay: 0.5,
                    duration: 0.25,
                    health: Math.max(target.health - attack.damage, 0),
                    onComplete() {
                        if(target.health == 0) {
                            target.faint();
                        }
                    }
                });
                
                break;
        }
    }
}