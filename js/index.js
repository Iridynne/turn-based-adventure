import { ALLIES } from "./constants/characters/allies.js";
import { Game } from "./game.js";
import * as ui from "./ui.js"

window.onload = () => {
    ui.setupCanvas();
    // ui.setupMainMenu();
    debugBattle();
    // debugUI();
};

function debugBattle() {
    var game = new Game();
    game.currentEncounter = game.encounterCount;
    // game.currentEncounter = 3;
    game.currentStage = 3;
    game.start();
}

function debugUI() {
    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");

    ctx.fillStyle = "fuchsia";
    ctx.fillRect(0, 0, cnv.width, cnv.height);

    // const params = {
    //     delay: 0,
    //     duration: 0
    // };
    // ui.showTransition("Test", "Test", params);

    ui.showEncounterMenu();
    ui.showAllyLabel(ALLIES.MAGE);
    ui.setupAttacks(ALLIES.MAGE.attacks);
}