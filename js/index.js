import { ALLIES } from "./constants/characters/allies.js";
import { Game } from "./game.js";
import * as ui from "./ui.js"

window.onload = () => {
    ui.setupCanvas();
    // ui.setupMainMenu();
    debug();
};

function debug() {
    var game = new Game();
    // game.currentEncounter = game.encounterCount;
    // game.currentEncounter = 3;
    game.currentStage = 1;
    game.start();
}