import { Character } from "../classes/character.js";
import { Sprite } from "../classes/sprite.js";
import { ENEMY_POSITIONS } from "../constants/characters/enemies.js";
import { randomInt } from "../utils/random.js";

// Canvas
const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

// UI
const ui = {
    dialogue: document.querySelector("#dialogue-box"),
    targets: document.querySelector("#enemy-box"),
    attacks: document.querySelector("#attacks-box"),
    ally: [
        {
            container: document.querySelector("#ally1-container"),
            healthbar: document.querySelector("#ally1-healthbar"),
            health: document.querySelector("#ally1-health")
        },
        {
            container: document.querySelector("#ally2-container"),
            healthbar: document.querySelector("#ally2-healthbar"),
            health: document.querySelector("#ally2-health")
        },
        {
            container: document.querySelector("#ally3-container"),
            healthbar: document.querySelector("#ally3-healthbar"),
            health: document.querySelector("#ally3-health")
        }
    ],
    enemy: [
        {
            container: document.querySelector("#enemy1-container"),
            healthbar: document.querySelector("#enemy1-healthbar"),
            health: document.querySelector("#enemy1-health")
        },
        {
            container: document.querySelector("#enemy2-container"),
            healthbar: document.querySelector("#enemy2-healthbar"),
            health: document.querySelector("#enemy2-health")
        },
        {
            container: document.querySelector("#enemy3-container"),
            healthbar: document.querySelector("#enemy3-healthbar"),
            health: document.querySelector("#enemy3-health")
        }
    ]
}

// Battle Variables
var background;
var allies;
var enemies = [];
var isBossFight;

var currentAlly = 0;
var attacksChosen = [];

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

    allies.forEach(ally => {
        attacksChosen.push({
            target: null,
            attack: null
        });
    });
}

export function createBossBattle(stage, allies) {

}

export function initBattle() {
    initUI();

    animate();
}

function animate() {
    var frameId = requestAnimationFrame(animate);

    // Draw Sprites
    background.draw(ctx);
    allies.forEach(ally => {
        ally.draw(ctx);
    });
    enemies.forEach(enemy => {
        enemy.draw(ctx);
    });
}

function initUI() {
    // Init Ally healthbars
    allies.forEach(ally => {
        const position = allies.indexOf(ally);

        const health = ally.health;
        const maxHealth = ally.maxHealth;

        ui.ally[position].healthbar.style.width = `${100 * health / maxHealth}%`;
        ui.ally[position].health.innerHTML = `${health} / ${maxHealth}`;
    });

    // Init Enemy healthbars
    enemies.forEach(enemy => {
        const position = enemies.indexOf(enemy);

        const health = enemy.health;
        const maxHealth = enemy.maxHealth;

        ui.enemy[position].healthbar.style.width = `${100 * health / maxHealth}%`;
        ui.enemy[position].health.innerHTML = `${health} / ${maxHealth}`;
    });

    updateUI();
}

function updateUI() {
    if(verifyAllChosen() == true) {
        ui.targets.style.opacity = 0;
        ui.attacks.style.opacity = 0;

        return;
    }

    // Targets list
    ui.targets.innerHTML = '';
    enemies.forEach(element => {
        const button = document.createElement('button');
        button.classList.add("option");
        button.innerHTML = element.name;

        button.onclick = () => {
            ui.targets.childNodes.forEach(child => {
                child.classList.remove("selected");
            });
            button.classList.add("selected");

            if(ui.attacks.style.opacity == 0)
                ui.attacks.style.opacity = 1;

            // Save Target choice
            attacksChosen[currentAlly].target = Array.from(ui.targets.children).indexOf(button);
        }
        
        ui.targets.append(button);
    });

    // Attacks List
    ui.attacks.style.opacity = 0;
    ui.attacks.innerHTML = '';
    allies[currentAlly].attacks.forEach(element => {
        const button = document.createElement('button');
        button.className = "option";
        button.style.color = element.type.color;
        button.innerHTML = element.name + "</br>" + "<div style=\"color: white; font-size: 10px; margin-top: 4px\">" + "Damage: " + element.damage + "</div>";

        button.onclick = () => {
            // Save Attack Choice
            const buttonIndex = Array.from(ui.attacks.children).indexOf(button);
            attacksChosen[currentAlly].attack = allies[currentAlly].attacks[buttonIndex];

            currentAlly = currentAlly == allies.length-1 ? 0 : currentAlly+1;
            updateUI();
        };
        
        document.querySelector('#attacks-box').append(button);
    });
}

function verifyAllChosen() {
    var ok = true;

    attacksChosen.forEach(choice => {
        if(choice.attack == null || choice.target == null) {
            ok = false;
        }
    });

    return ok;
}