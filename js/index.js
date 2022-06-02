import { MUSIC } from "./constants/audio.js";
import * as general from "./constants/general.js";
import { Game } from "./game.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

// Initialization
var game = new Game();

window.onload = function () {
    canvasSetup();
    
    // game.start();
}

function canvasSetup() {
    // Set Canvas Size
    cnv.width = 1024;
    cnv.height = 576;

    // Font + Image Scaling
    ctx.font = general.DEFAULT_FONT;
    ctx.imageSmoothingEnabled = false;

    // Fill Background
    ctx.fillStyle = general.COLOR_1;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
}

// let clicked = false;
// addEventListener("click", () => {
//     if(!clicked) {
//         MUSIC.FOREST_BATTLE.play();
//         clicked = true;
//     }
// });