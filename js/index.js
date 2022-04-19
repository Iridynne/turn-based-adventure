import * as general from "./constants/general.js"
import { ENEMIES } from "./constants/enemies.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

function canvasSetup() {
    // Set Canvas Size
    cnv.width = 1024;
    cnv.height = 576;

    // Font + Image Scaling
    ctx.font = general.DEFAULT_FONT;
    ctx.imageSmoothingEnabled = false;

    // Fill Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
}

// Initialization
window.onload = function () {
    canvasSetup();

    requestAnimationFrame(animate);
}

function animate() {
    if(ctx == null) return;

    var background = new Image();
    background.src = general.BACKGROUND_PATH + "forest.png"
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);

    var slime = new Image();
    slime.src = ENEMIES.SLIME.imageSrc;
    ctx.drawImage(slime, 2*cnv.width/3, cnv.height-128, slime.width * 4, slime.height * 4);
    requestAnimationFrame(animate);
}