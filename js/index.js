import * as constants from "./config/constants.js"

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

cnv.width = innerWidth;
cnv.height = innerHeight;

// Initialization
window.onload = function () {
    ctx.fillStyle = constants.COLOR_1;
    ctx.fillRect(0, 0, cnv.width, cnv.height);
    gameMap.generate();

    requestAnimationFrame(drawGame);
    ctx.font = constants.DEFAULT_FONT;
}

function drawGame() {
    if(ctx == null) return;

    requestAnimationFrame(drawGame);
}