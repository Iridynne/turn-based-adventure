import { Sprite } from "../classes/sprite.js";
import { CAMPFIRE } from "../constants/misc.js";
import { Game } from "../game.js";
import * as ui from "../ui.js"
import { wait } from "../utils/timer.js";

const sequence = [
    {
        text: "You have reached a resting spot.",
        action: () => {}
    },
    {
        text: "All allies rest and recover their strength.",
        action: () => {
            RestSpot.currentRestSpot.allies.forEach(ally => {
                ally.health = ally.maxHealth;
                ui.updateHealthbar(ally);
            });
        }
    },
    {
        text: "After a good rest you proceed onward.",
        action: () => {}
    }
]

export class RestSpot {
    static currentRestSpot;
    static seqIndex;

    constructor(stage, allies) {
        this.stage = {
            background: new Sprite(stage)
        };
        this.allies = allies;
        this.campfire = new Sprite(CAMPFIRE);

        this.animate = this.animate.bind(this);

        RestSpot.seqIndex = 0;
        RestSpot.currentRestSpot = this;
    }

    #animationFrame;
    animate() {
        this.#animationFrame = requestAnimationFrame(this.animate);

        this.stage.background.draw();
        this.allies.forEach(ally => ally.draw());
        this.campfire.draw();
    }

    start() {
        // Hide Transition
        ui.hideTransition();

        // Setup Healthbars
        ui.setupHealthbars(this.allies);

        // Initiate Menu
        ui.showEncounterMenu();

        this.#advanceSequence();

        this.animate();
    }

    end() {
        cancelAnimationFrame(this.#animationFrame);
        Game.currentGame.allies = this.allies;
        // Transition Screen
        const params = {
            duration: 0.5,
            onComplete() {
                ui.hideEncounterMenu();
                wait(2000).then(() => {
                    Game.currentGame.advance();
                });
            }
        };
        ui.showTransition("Rested", "", params);
    }

    #advanceSequence() {
        sequence[RestSpot.seqIndex].action();
        ui.showDialogue(sequence[RestSpot.seqIndex].text, () => {
            RestSpot.seqIndex++;
            if(RestSpot.seqIndex >= sequence.length) {
                this.end();
                return;
            }
            this.#advanceSequence();
        });
    }
}