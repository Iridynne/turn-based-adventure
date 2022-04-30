import { Character } from "./classes/character.js";
import { MUSIC } from "./constants/audio.js";
import { STAGES } from "./constants/stages.js"
import { ALLIES, ALLY_POSITIONS } from "./constants/characters/allies.js";
import * as general from "./constants/general.js";
import { createBattle, initBattle } from "./scenes/battle_scene.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

// Initialization

var allies = [
    new Character({...ALLIES.WARRIOR, position: ALLY_POSITIONS.FIRST}),
    new Character({...ALLIES.ARCHER, position: ALLY_POSITIONS.SECOND}),
    new Character({...ALLIES.MAGE, position: ALLY_POSITIONS.THIRD})
];

window.onload = function () {
    canvasSetup();
    
    createBattle(STAGES.FOREST, allies);
    initBattle();
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

function animate() {
    requestAnimationFrame(animate);
}

function transition() {
    gsap.to("#overlay-transition",{
        opacity: 1,
        yoyo: true,
        duration: 0.4,
        onComplete() {
        }
    });
}

// let clicked = false;
// addEventListener("click", () => {
//     if(!clicked) {
//         MUSIC.FOREST_BATTLE.play();
//         clicked = true;
//     }
// });