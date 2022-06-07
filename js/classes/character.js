import { Sprite } from "./sprite.js";
import * as ui from "../ui.js"
import { Healthbar } from "./healthbar.js";

export class Character extends Sprite {
    constructor({
        position = {x:0, y:0}, 
        image, 
        frames = {max: 1, hold: 10}, 
        animate = false,
        name,
        health,
        attacks,
        isEnemy = false,
        healthbarId
    }) {
        super({position, image, frames, animate});

        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.attacks = attacks;
        this.isEnemy = isEnemy;
        this.healthUI = new Healthbar(healthbarId);

        this.faint = this.faint.bind(this);
    }

    faint() {
        gsap.to(this.position, {
            x: this.position.x + 20 * (this.isEnemy? 1 : -1),
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
        gsap.to(this, {
            opacity: 0
        });
    }

    attack({attack, target}) {
        var duration = 0.25;

        if(attack.isRanged) {
            var projectile = new Sprite({
                image: this.isEnemy? attack.imageLeft : attack.imageRight,
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
                                repeat: 4,
                                duration: duration / 2,
                                onComplete() {
                                    target.opacity = 1;
                                }
                            });

                            // Health Animation
                            gsap.to(target, {
                                duration: duration / 2,
                                health: Math.max(target.health - attack.damage, 0),
                                onComplete() {
                                    ui.updateHealthbar(target);
                                    if(target.health == 0) {
                                        ui.hideHealthbar(target);
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
                                repeat: 4,
                                duration: duration / 2,
                                onComplete() {
                                    target.opacity = 1;
                                }
                            });

                            // Health Animation
                            gsap.to(target, {
                                duration: duration / 2,
                                health: Math.max(target.health - attack.damage, 0),
                                onComplete() {
                                    ui.updateHealthbar(target);
                                    if(target.health == 0) {
                                        ui.hideHealthbar(target);
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