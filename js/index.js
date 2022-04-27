import { Character } from "./classes/character.js";
import { Sprite } from "./classes/sprite.js";
import { MUSIC } from "./constants/audio.js";
import { ALLIES, ALLY_POSITIONS } from "./constants/characters/allies.js"
import { ENEMIES, ENEMY_POSITIONS } from "./constants/characters/enemies.js";
import * as general from "./constants/general.js"
import { CAMPFIRE, STAGES } from "./constants/stages.js";
import { createBattle, initBattle } from "./scenes/battle_scene.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

// Initialization

const background = new Sprite(STAGES.FOREST);

const allies = [
    new Character({...ALLIES.WARRIOR, position: ALLY_POSITIONS.FIRST}),
    new Character({...ALLIES.ARCHER, position: ALLY_POSITIONS.SECOND}),
    new Character({...ALLIES.MAGE, position: ALLY_POSITIONS.THIRD})
];

const enemy = new Character({...ENEMIES.EVIL_MAGE, position: ENEMY_POSITIONS.FIRST});
const enemy2 = new Character({...ENEMIES.SKELETON, position: ENEMY_POSITIONS.SECOND});
const enemy3 = new Character({...ENEMIES.SLIME, position: ENEMY_POSITIONS.THIRD});

const enemies = [enemy, enemy2, enemy3];

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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, cnv.width, cnv.height);
}

function animate() {
    requestAnimationFrame(animate);
    
    background.draw(ctx);
    enemies.forEach(element => {
        element.draw(ctx);
    });

    // spriteReferences.forEach(element => {
    //     element.draw(ctx);
    // });
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