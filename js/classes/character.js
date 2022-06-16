import { Sprite } from "./sprite.js";
import * as ui from "../ui.js"
import { TYPE } from "../constants/attacks.js";

export class Character extends Sprite {
    constructor({
        position = {x:0, y:0}, 
        image, 
        frames = {max: 1, hold: 10}, 
        animate = false,
        mirror = false,
        name,
        stats = {health: 10, defense: 0, magicDefense: 0},
        attacks,
        healthbarId
    }) {
        super({position, image, frames, animate, mirror});

        this.name = name;
        this.health = stats.health;
        this.maxHealth = stats.health;
        this.defense = stats.defense;
        this.magicDefense = stats.magicDefense;
        this.attacks = attacks;
        this.healthbarId = healthbarId;

        this.faint = this.faint.bind(this);
    }

    faint() {
        gsap.to(this.position, {
            x: this.position.x + 20 * (this.mirror? 1 : -1),
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
                image: attack.image,
                position: {
                    ...this.position, 
                    x: this.position.x + 32 * (this.mirror? -1 : 1)
                },
                mirror: this.mirror
            });

            // Projectile Fire Sound Effect
            attack.sound.shoot.play();

            // Projectile Animation
            gsap.to(projectile.position, {
                x: target.position.x + 32 * (this.mirror? 1 : -1),
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
                        x: target.position.x + 16 * (target.mirror? 1 : -1),
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

                            // Calculated Damage against defenses
                            const damage = Character.calculateDamage({attack, target});

                            // Health Animation
                            gsap.to(target, {
                                duration: duration / 2,
                                health: Math.max(target.health - damage, 0),
                                onComplete() {
                                    ui.enableDialogueClick();
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
                x: this.position.x + 16 * (this.mirror? 1 : -1),
                duration: duration * 2/3
            }).to(this.position, {
                x: target.position.x + 32 * (this.mirror? 1 : -1),
                duration: duration / 3,
                onComplete() {
                    // Hit Sound Effect
                    attack.sound.hit.play();

                    let tl = gsap.timeline();
                    // Impact Animation
                    tl.to(target.position, {
                        x: target.position.x + 16 * (target.mirror? 1 : -1),
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

                            // Calculated Damage against defenses
                            const damage = Character.calculateDamage({attack, target});

                            // Health Animation
                            gsap.to(target, {
                                duration: duration / 2,
                                health: Math.max(target.health - damage, 0),
                                onComplete() {
                                    ui.enableDialogueClick();
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

    static calculateDamage({attack, target}) {
        var damage = attack.damage;

        switch(attack.type) {
            case TYPE.PHYSICAL:
                damage = Math.max(0, damage - target.defense);
                break;
            case TYPE.MAGICAL:
                damage = Math.max(0, damage - target.magicDefense);
                break;
        }

        return damage;
    }
}