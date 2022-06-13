import { Character } from "../classes/character.js";
import { ENEMY_POSITIONS } from "../constants/characters/enemies.js";
import { randomInt, randomizeList, weightedRand } from "../utils/random.js"
import * as ui from "../ui.js"
import { Sprite } from "../classes/sprite.js";
import { wait } from "../utils/timer.js";
import { Game } from "../game.js";
import { fadeIn, fadeOut } from "../utils/audio_utils.js";
import { deleteData } from "../utils/data.js";

export class Battle {
    static currentBattle;

    constructor(stage, allies = [], isBoss = false) {
        this.stage = {
            background: new Sprite(stage),
            music: stage.music.battle
        };
        this.allies = allies;
        this.isBoss = isBoss;
        if(isBoss)
            this.#generateBoss(stage);
        else
            this.#generateEnemies(stage);

        // Combat
        this.currentAlly = 0;
        this.choices = [];

        this.animate = this.animate.bind(this);
        this.displayChoices = this.displayChoices.bind(this);

        Battle.currentBattle = this;
    }

    #animationFrame;
    animate() {
        this.#animationFrame = requestAnimationFrame(this.animate);
        // Draw Sprites
        this.stage.background.draw();
        this.allies.forEach(ally => ally.draw());
        this.enemies.forEach(enemy => enemy.draw());
    }

    start() {
        // Start Music
        fadeIn(this.stage.music);

        // Hide Transition
        ui.hideTransition();

        // Setup Healthbars
        ui.setupHealthbars(this.allies.concat(this.enemies));

        // Initiate Menu
        ui.showEncounterMenu();
        ui.showDialogue("Prepare for battle!", () => {
            ui.hideDialogue();
            this.displayChoices();
        });

        this.animate();
    }

    displayChoices() {
        if(this.currentAlly >= this.allies.length) {
            this.#finishRound();
            return;
        }

        // Setup Attacks
        ui.showAllyLabel(this.allies[this.currentAlly]);
        ui.setupAttacks(this.allies[this.currentAlly].attacks);
    }

    #generateBoss(stage) {
        var enemies = [];
        const bossCount = stage.bosses.length;
        const boss = stage.bosses[randomInt(0,bossCount-1)];
        if(boss.minions) {
            boss.minions.forEach(minion => {
                const index = enemies.length;
                const enemyPosition = Object.entries(ENEMY_POSITIONS)[index][1];
                enemies.push(new Character({...minion, ...enemyPosition}));
            });
        }
        
        const index = enemies.length;
        const enemyPosition = Object.entries(ENEMY_POSITIONS)[index][1];
        enemies.push(new Character({...boss, ...enemyPosition}));

        this.enemies = enemies;
    }

    #generateEnemies(stage) {
        var countWeights = weightedRand({1: 0.5, 2: 0.35, 3: 0.15}, 2);
        var enemies = [];
        var count = countWeights();

        for(var i=0; i<count; i++) {
            const enemyCount = stage.enemies.length;
            const enemy = stage.enemies[randomInt(0, enemyCount-1)];

            const enemyPosition = Object.entries(ENEMY_POSITIONS)[i][1];

            enemies.push(new Character({...enemy, ...enemyPosition}));
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

            this.choices.push({
                attacker: value,
                attack: attack,
                target: target
            });
        });

        // Determine order of attacks
        order = randomizeList(this.choices);

        this.#proceedOrder(order, 0);
    }

    #verifyWinLoss() {
        // Win Condition
        if(!this.enemies.length) {
            cancelAnimationFrame(this.#animationFrame);
            Game.currentGame.allies = this.allies;
            ui.showDialogue("All enemies have been killed.", () => {
                // Win Screen
                const params = {
                    duration: 0.5,
                    onComplete() {
                        ui.hideHealthbars();
                        ui.hideEncounterMenu();
                        const showContinue = !Game.currentGame.isEnd();
                        Game.currentGame.advance();
                        ui.showTransitionOptions(showContinue, true);
                    }
                };

                ui.showTransition("Victory", "", params);

                // Fade Music
                fadeOut(this.stage.music);
            });
            return true;
        }

        // Lose Condition
        if(!this.allies.length) {
            cancelAnimationFrame(this.#animationFrame);
            ui.showDialogue("All allies have been killed.", () => {
                // Loss Screen
                const params = {
                    duration: 0.5,
                    onComplete() {
                        ui.hideHealthbars();
                        ui.hideEncounterMenu();
                        deleteData();
                        ui.showTransitionOptions(false, true);
                    }
                };
                ui.showTransition("Game Over", "", params);

                // Fade Music
                fadeOut(this.stage.music);
            });
            return true;
        }

        return false;
    }

    #proceedOrder(order, index) {
        if(index >= order.length) {
            this.currentAlly = 0;
            this.choices = [];
            this.#removeDead();
            if(!this.#verifyWinLoss()) 
                this.displayChoices();
            return;
        }
        
        const choice = this.choices[index];
        const char = choice.attacker;

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