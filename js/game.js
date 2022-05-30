import { Character } from "./classes/character.js";
import { ALLY_POSITIONS } from "./constants/characters/allies.js";
import * as general from "./constants/general.js";
import { STAGES } from "./constants/stages.js";
import { createBattle, initBattle } from "./scenes/battle_scene.js";

export class Game {
    static currentGame;

    constructor(
        allies = general.DEFAULT_ALLIES
    ) {
        this.encounterCount = general.ENCOUNTER_COUNT;
        this.stageCount = general.STAGE_COUNT;
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
}