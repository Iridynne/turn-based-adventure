import { ALLIES, ALLY_POSITIONS } from "./constants/allies.js";
import { ENEMIES } from "./constants/enemies.js";
import { Game } from "./classes/game.js";
import * as ui from "./utils/ui.js"
import { saveData } from "./utils/data.js";
import { wait } from "./utils/timer.js";

window.onload = () => {
    ui.setupCanvas();
    // ui.setupMainMenu();
    debugBattle();
    // debugUI();
};

function debugBattle() {
    var game = new Game();
    // game.currentEncounter = game.encounterCount;
    // game.currentEncounter = 3;
    game.currentStage = 1;
    game.start();
}

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

function debugUI() {
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