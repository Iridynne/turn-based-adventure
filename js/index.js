import * as general from "./constants/general.js"
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