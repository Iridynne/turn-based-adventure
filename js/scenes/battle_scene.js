import { Character } from "../classes/character.js";
import { Sprite } from "../classes/sprite.js";
import { ENEMY_POSITIONS } from "../constants/characters/enemies.js";
import { randomInt } from "../utils/random.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

var background;
var allies;
var enemies = [];
var isBossFight;

export function createBattle(stage, allyList) {
    background = new Sprite(stage);
    allies = allyList;

    for(var i=0; i<3; i++) {
        const enemiesCount = stage.enemies.length;
        const enemy = stage.enemies[randomInt(0,enemiesCount-1)];
        const enemyChar = new Character({
            ...enemy, 
            position: ENEMY_POSITIONS[Object.keys(ENEMY_POSITIONS)[i]]
        });
        enemies.push(enemyChar);
    }

    isBossFight = false;
}

export function createBossBattle(stage, allies) {

}

export function initBattle() {
    animate();
}

function animate() {
    var frameId = requestAnimationFrame(animate);

    background.draw(ctx);
    enemies.forEach(enemy => {
        enemy.draw(ctx);
    })
}