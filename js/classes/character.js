import { SOUND } from "../constants/audio.js";
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
            x: this.position.x + 20 * (this.isEnemy? 1 : -1)
        });
        gsap.to(this, {
            opacity: 0
        });
    }

    attack({attack, target}) {
        var duration = 0.25;

        if(attack.isRanged) {
            var projectile = new Sprite({
                image: attack.image,
                position: {
                    ...this.position, 
                    x: this.position.x + 32 * (this.isEnemy? -1 : 1)
                }
            });

            // Projectile Fire Sound Effect
            attack.sound.fire.play();

            // Projectile Animation
            gsap.to(projectile.position, {
                x: target.position.x + 32 * (this.isEnemy? 1 : -1),
                duration: duration,
                onUpdate() {
                    projectile.draw();
                },
                onComplete() {
                    // Hit Sound Effect
                    attack.sound.hit.play();

                    const tl = gsap.timeline();

                    // Impact Animation
                    tl.to(target.position, {
                        x: target.position.x + 16 * (target.isEnemy? 1 : -1),
                        duration: duration / 2, 
                        onComplete() {
                            gsap.to(target, {
                                opacity: 0,
                                yoyo: true,
                                repeat: 5,
                                duration: duration / 2
                            });

                            // Health Animation
                            gsap.to(target, {
                                duration: duration / 2,
                                health: Math.max(target.health - attack.damage, 0),
                                onComplete() {
                                    if(target.health == 0) {
                                        target.faint();
                                    }
                                }
                            });
                        }
                    }).to(target.position, {
                        x: target.position.x,
                        duration: duration / 2
                    });
                }
            });
        }
        else {
            const tl = gsap.timeline();

            // Approach & Return Animation
            tl.to(this.position, {
                x: this.position.x + 16 * (this.isEnemy? 1 : -1),
                duration: duration * 2/3
            }).to(this.position, {
                x: target.position.x + 32 * (this.isEnemy? 1 : -1),
                duration: duration / 3,
                onComplete() {
                    // Hit Sound Effect
                    attack.sound.hit.play();

                    let tl = gsap.timeline();
                    // Impact Animation
                    tl.to(target.position, {
                        x: target.position.x + 16 * (target.isEnemy? 1 : -1),
                        duration: duration / 2, 
                        onComplete() {
                            gsap.to(target, {
                                opacity: 0,
                                yoyo: true,
                                repeat: 5,
                                duration: duration / 2
                            });

                            // Health Animation
                            gsap.to(target, {
                                duration: duration / 2,
                                health: Math.max(target.health - attack.damage, 0),
                                onComplete() {
                                    if(target.health == 0) {
                                        target.faint();
                                    }
                                }
                            });
                        }
                    }).to(target.position, {
                        x: target.position.x,
                        duration: duration / 2
                    });
                }
            }).to(this.position, {
                x: this.position.x,
                duration: duration,
            });
        }
    }
}