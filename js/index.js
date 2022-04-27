import { Character } from "./classes/character.js";
import { Sprite } from "./classes/sprite.js";
import { MUSIC } from "./constants/audio.js";
import { ALLIES, ALLY_POSITIONS } from "./constants/characters/allies.js"
import { ENEMIES, ENEMY_POSITIONS } from "./constants/characters/enemies.js";
import * as general from "./constants/general.js"
import { CAMPFIRE, STAGES } from "./constants/stages.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

// Initialization

const background = new Sprite(STAGES.FOREST);

const enemy = new Character({...ENEMIES.EVIL_MAGE, position: ENEMY_POSITIONS.FIRST});
const enemy2 = new Character({...ENEMIES.SKELETON, position: ENEMY_POSITIONS.SECOND});
const enemy3 = new Character({...ENEMIES.SLIME, position: ENEMY_POSITIONS.THIRD});

const enemies = [enemy, enemy2, enemy3];

document.querySelector('#dialogue-box').style.display = 'none';

window.onload = function () {
    canvasSetup();
    animate();

    document.querySelector("#attacks-box").style.opacity = 0;

    enemy.attacks.forEach(element => {
        const button = document.createElement('button');
        button.className = "option";
        button.style.color = element.type.color;
        button.innerHTML = element.name + "</br>" + "<div style=\"color: white; font-size: 10px; margin-top: 4px\">" + "Damage: " + element.damage + "</div>";
        
        document.querySelector('#attacks-box').append(button);
    });

    enemies.forEach(element => {
        const button = document.createElement('button');
        button.classList.add("option");
        button.innerHTML = element.name;

        button.onclick = () => {
            button.classList.add("selected");

            document.querySelector("#enemy-box").childNodes.forEach(element => {
                element.disabled = true;
            });

            document.querySelector("#attacks-box").style.opacity = 1;
        }
        
        document.querySelector('#enemy-box').append(button);


        document.querySelector(`#enemy${enemies.indexOf(element)+1}-health`).innerHTML = element.health + " / " + element.health;
    });
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