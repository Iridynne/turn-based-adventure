import { Character } from "./classes/character.js";
import { ALLY_POSITIONS, DEFAULT_ALLIES } from "./constants/characters/allies.js";
import { ENCOUNTER_COUNT, STAGE_COUNT } from "./constants/stages.js"
import { STAGES } from "./constants/stages.js";
import { Battle } from "./encounters/battle.js"
import { RestSpot } from "./encounters/rest_spot.js";
import { deleteData, saveData } from "./utils/data.js"
import * as ui from "./ui.js"

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
            this.allies.push(new Character({...value, position: position, healthbarId: `ally${index+1}`}));
        });

        Game.currentGame = this;
    }

    start() {
        if(this.currentStage > this.stageCount) {
            this.end();
            return;
        }

        const stage = Object.entries(STAGES)[this.currentStage-1][1];

        // Start Transition
        const title = stage.name;
        const subtitle = `${this.currentEncounter} - ${this.currentStage}`;
        const params = {
            duration: 0.5,
            onComplete() {
                // Initiate & Start Battle
                const currentGame = Game.currentGame;
                var encounter;
                if(currentGame.currentEncounter === currentGame.encounterCount)
                    encounter = new Battle(stage, currentGame.allies, true);
                else if(currentGame.currentEncounter % 3 == 0)
                    encounter = new RestSpot(stage, currentGame.allies);
                else
                    encounter = new Battle(stage, currentGame.allies);
                encounter.start();

            }
        }
        ui.showTransition(title, subtitle, params);
    }

    advance() {
        this.currentEncounter++;
        if(this.currentEncounter > this.encounterCount) {
            this.currentEncounter = 1;
            this.currentStage++;

            // Heal Allies
            this.allies.forEach(ally => ally.health = ally.maxHealth);
        }
        if(this.currentStage <= this.stageCount) saveData(this);
        else deleteData();
    }

    end() {
        ui.hideTransition({duration: 0});
        ui.setupMainMenu();
    }

    isEnd() {
        return this.currentEncounter === this.encounterCount && this.currentStage === this.stageCount;
    }
}