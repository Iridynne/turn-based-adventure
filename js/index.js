import { Sprite } from "./classes/sprite.js";
import { MUSIC } from "./constants/audio.js";
import { ENEMIES, ENEMY_POSITIONS } from "./constants/enemies.js";
import * as general from "./constants/general.js"
import { backgroundPath} from "./utils/paths.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

// Initialization
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: {
        src: backgroundPath("forest")
    }
});

const slime = new Sprite({
    position: ENEMY_POSITIONS.FIRST,
    image: ENEMIES.SLIME.image,
    frames: ENEMIES.SLIME.frames,
    animate: ENEMIES.SLIME.animate
});

const skeleton = new Sprite({
    position: ENEMY_POSITIONS.SECOND,
    image: ENEMIES.SKELETON.image,
    frames: ENEMIES.SKELETON.frames,
    animate: ENEMIES.SKELETON.animate
});

const evilMage = new Sprite({
    position: ENEMY_POSITIONS.THIRD,
    image: ENEMIES.EVIL_MAGE.image,
    frames: ENEMIES.EVIL_MAGE.frames,
    animate: ENEMIES.EVIL_MAGE.animate
});

window.onload = function () {
    canvasSetup();
    animate();

    transition();
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
    slime.draw(ctx);
    skeleton.draw(ctx);
    evilMage.draw(ctx);
    goblin.draw(ctx);
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