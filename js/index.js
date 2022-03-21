import * as constants from "./config/constants.js"
import { Map } from "./game-map.js";
import {Array} from "./utils/array.js"
import { FramesCounter } from "./interface/frames-counter.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

cnv.width = innerWidth;
cnv.height = innerHeight;

ctx.fillStyle = constants.COLOR_3;
ctx.fillRect(0, 0, cnv.width, cnv.height);

// Map
var gameMap = new Map();

// Utility
var framesCounter = new FramesCounter(ctx, 10, 20, constants.COLOR_4);

// Initialization
window.onload = function () {
    gameMap.generate();

    requestAnimationFrame(drawGame);
    ctx.font = constants.DEFAULT_FONT;
}

function drawGame() {
    if(ctx == null) return;

    gameMap.draw(ctx);

    framesCounter.draw();
    requestAnimationFrame(drawGame);
}