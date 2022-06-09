import { Character } from "./classes/character.js";
import { Sprite } from "./classes/sprite.js";
import { ALLIES } from "./constants/characters/allies.js";
import { STAGES } from "./constants/stages.js";
import { Game } from "./game.js";
import * as ui from "./ui.js"

window.onload = () => {
    ui.setupCanvas();
    // ui.setupMainMenu();
    // debugBattle();
    debugUI();
};

function debugBattle() {
    var game = new Game();
    game.currentEncounter = game.encounterCount;
    // game.currentEncounter = 3;
    game.currentStage = 1;
    game.start();
}

function debugUI() {
    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");
    ctx.fillStyle = "gray";
    ctx.fillRect(0,0, cnv.width, cnv.height);

    const chars = [
        new Character({...ALLIES.MAGE, healthbarId: 'ally1'}),
        new Character({...ALLIES.MAGE, healthbarId: 'ally2'}),
        new Character({...ALLIES.MAGE, healthbarId: 'ally3'}),
        new Character({...ALLIES.MAGE, healthbarId: 'enemy1'}),
        new Character({...ALLIES.MAGE, healthbarId: 'enemy2'}),
        new Character({...ALLIES.MAGE, healthbarId: 'enemy3'}),
    ];

    ui.setupHealthbars(chars);
}