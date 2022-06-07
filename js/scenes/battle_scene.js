import { Character } from "../classes/character.js";
import { ENEMY_POSITIONS } from "../constants/characters/enemies.js";
import { randomInt, randomizeList, weightedRand } from "../utils/random.js"
import * as ui from "../ui.js"
import { Sprite } from "../classes/sprite.js";
import { wait } from "../utils/timer.js";
import { Game } from "../game.js";
import { fadeIn, fadeOut } from "../utils/audio_utils.js";

export class Battle {
    static currentBattle;

    constructor(stage, allies = []) {
        this.stage = {
            background: new Sprite({...stage}),
            music: stage.music.battle
        };
        this.allies = allies;
        this.#generateEnemies(stage);

        // Combat
        this.currentAlly = 0;
        this.choices = {
            ally1: null,
            ally2: null,
            ally3: null,
            enemy1: null,
            enemy2: null,
            enemy3: null
        };

        this.animate = this.animate.bind(this);
        this.displayChoices = this.displayChoices.bind(this);

        Battle.currentBattle = this;
    }

    static #animationFrame;
    animate() {
        Battle.#animationFrame = requestAnimationFrame(this.animate);
        // Draw Sprites
        this.stage.background.draw();
        this.allies.forEach(ally => {
            ally.draw();
        });
        this.enemies.forEach(enemy => {
            enemy.draw();
        });
    }

    start() {
        // Start Music
        fadeIn(this.stage.music, 500);

        // Hide Transition
        ui.hideTransition();

        // Setup Healthbars
        ui.setupHealthbars(this.allies.concat(this.enemies));

        // Initiate Menu
        ui.showEncounterMenu();
        ui.showDialogue("Prepare for battle!", ui.hideDialogue);

        // Initiate Combat Choices
        this.displayChoices();

        this.animate();
    }

    displayChoices() {
        if(this.currentAlly >= this.allies.length) {
            this.#finishRound();
            return;
        }

        // Setup Attacks
        ui.setupAttacks(this.allies[this.currentAlly].attacks);
    }

    #generateEnemies(stage) {
        var countWeights = weightedRand({1: 0.55, 2: 0.30, 3: 0.15}, 2);
        var enemies = [];
        var count = countWeights();

        for(var i=0; i<count; i++) {
            const enemyCount = stage.enemies.length;
            const enemy = stage.enemies[randomInt(0, enemyCount-1)];

            const enemyPosition = Object.entries(ENEMY_POSITIONS)[i][1];

            enemies.push(new Character({...enemy, position: enemyPosition, healthbarId: `enemy${i+1}`}));
        }

        this.enemies = enemies;
    }

    #finishRound() {
        // Grab identifiers
        var order = [];
        this.allies.forEach((value, i) => {
            order.push(`ally${i+1}`);
        });
        this.enemies.forEach((value, i) => {
            order.push(`enemy${i+1}`);
        });

        // Choose Enemy Abilities
        this.enemies.forEach((value, i) => {
            const target = this.allies[randomInt(0,this.allies.length-1)];
            const attack = value.attacks[randomInt(0, value.attacks.length-1)];

            this.choices[`enemy${i+1}`] = {
                attack: attack,
                target: target
            };
        });

        // Determine order of attacks
        order = randomizeList(order);

        this.#proceedOrder(order, 0);
    }

    #verifyWinLoss() {
        // Win Condition
        if(!this.enemies.length) {
            cancelAnimationFrame(Battle.#animationFrame);
            Game.currentGame.allies = this.allies;
            ui.showDialogue("All enemies have been killed.", () => {
                // Win Screen
                const params = {
                    duration: 0.5,
                    onComplete() {
                        ui.hideEncounterMenu();
                        wait(2000).then(() => {
                            Game.currentGame.advance();
                        });
                    }
                };
                ui.showTransition("Victory!", "", params);

                // Fade Music
                fadeOut(this.stage.music, 500);
            });
            return true;
        }

        // Lose Condition
        if(!this.allies.length) {
            cancelAnimationFrame(Battle.#animationFrame);
            ui.showDialogue("All allies have been killed.", () => {
                // Loss Screen
                const params = {
                    duration: 0.5,
                    onComplete() {
                        ui.hideEncounterMenu();
                        wait(2000).then(() => {
                            Game.currentGame.end();
                        });
                    }
                };
                ui.showTransition("Defeat!", "", params);

                // Fade Music
                fadeOut(this.stage.music, 500);
            });
            return true;
        }

        return false;
    }

    #proceedOrder(order, index) {
        if(index >= order.length) {
            this.currentAlly = 0;
            this.#removeDead();
            if(!this.#verifyWinLoss()) 
                this.displayChoices();
            return;
        }
        
        const choice = this.choices[order[index]];
        const charIndex = parseInt(order[index].slice(-1));
        const char = order[index].includes("ally")? this.allies[charIndex-1] : this.enemies[charIndex-1];

        if(choice == null || !choice.target || choice.target.health === 0 || !char || char.health === 0) {
            wait(100).then(this.#proceedOrder(order, index+1));
            return;
        }

        ui.showDialogue(`${char.name} used <span style=\"color: ${choice.attack.type.color}\">${choice.attack.name}</span> against ${choice.target.name}.`, () => {
            ui.hideDialogue();
            this.#removeDead();
            if(!this.#verifyWinLoss())
                this.#proceedOrder(order, index+1);
        });
        char.attack(choice);
    }

    #removeDead() {
        this.allies = this.allies.filter(ally => {
            return ally.health !== 0;
        });

        this.enemies = this.enemies.filter(enemy => {
            return enemy.health !== 0;
        });
    }
}