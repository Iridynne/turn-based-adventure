import { Game } from "./game.js";
import * as ui from "./ui.js"

window.onload = () => {
    ui.canvasSetup();
    // ui.setupMainMenu();
    debug();
};

function debug() {
    var game = new Game();
    game.currentEncounter = game.encounterCount;
    game.currentStage = 2;
    game.start();
}