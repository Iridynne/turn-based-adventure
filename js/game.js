import { Character } from "./classes/character.js";
import { ALLY_POSITIONS, DEFAULT_ALLIES } from "./constants/characters/allies.js";
import { ENCOUNTER_COUNT, STAGE_COUNT } from "./constants/stages.js"
import { STAGES } from "./constants/stages.js";
import { createBattle, initBattle } from "./scenes/battle_scene.js";

export class Game {
    static currentGame;

    constructor(
        allies = DEFAULT_ALLIES
    ) {
        this.encounterCount = ENCOUNTER_COUNT;
        this.stageCount = STAGE_COUNT;
        this.currentEncounter = 1;
        this.currentStage = 1;

        this.allies = [];
        allies.forEach((value, index) => {
            const position = Object.entries(ALLY_POSITIONS)[index][1];
            this.allies.push(new Character({...value, position: position}))
        });

        Game.currentGame = this;
    }

    start() {
        const stage = Object.entries(STAGES)[this.currentStage-1][1];

        createBattle(stage, this.allies);
        initBattle();
    }

    advance() {
        this.currentEncounter++;
        if(this.currentEncounter > this.encounterCount) {
            this.currentEncounter = 1;
            this.currentStage++;
            if(this.currentStage > this.stageCount) {
                this.end();
                return;
            }
        }

        this.start();
    }

    end() {

    }
}