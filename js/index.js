import * as general from "./constants/general.js"
import { ENEMIES } from "./constants/enemies.js";
import { ALLIES } from "./constants/allies.js";
import { backgroundPath, enemyPath } from "./utils/image_paths.js";

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
    requestAnimationFrame(animate);
    
    var background = new Image();
    background.src = backgroundPath("forest");
    ctx.drawImage(background, 0, 0, cnv.width, cnv.height);

    var enemy1 = new Image();
    enemy1.src = enemyPath("evil_mage");
    ctx.fillStyle = "crimson"
    ctx.fillRect(cnv.width-304, cnv.height-160, 96, 32);
    ctx.drawImage(enemy1, cnv.width-320, cnv.height-128-48, enemy1.width * 4, enemy1.height * 4);
}

function transition() {
    gsap.to("#overlay_transition",{
        opacity: 1,
        yoyo: true,
        duration: 0.4,
        onComplete() {
        }
    });
}