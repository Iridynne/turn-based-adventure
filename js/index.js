import { ALLIES } from "./constants/characters/allies.js";
import { Game } from "./game.js";
import * as ui from "./ui.js"

window.onload = () => {
    ui.setupCanvas();
    // ui.setupMainMenu();
    debug();
};

function debug() {
    var game = new Game([ALLIES.ARCHER]);
    // game.currentEncounter = game.encounterCount;
    game.currentStage = 3;
    game.start();
}