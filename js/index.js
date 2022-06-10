import { ALLIES } from "./constants/characters/allies.js";
import { Game } from "./game.js";
import * as ui from "./ui.js"

window.onload = () => {
    ui.setupCanvas();
    ui.setupMainMenu();
    // debugBattle();
    // debugUI();
};

function debugBattle() {
    var game = new Game();
    game.currentEncounter = game.encounterCount;
    // game.currentEncounter = 3;
    game.currentStage = 1;
    game.start();
}

function debugUI() {
    const params = {
        delay: 0,
        duration: 0
    };
    ui.showTransition("Test", "Test", params);
}