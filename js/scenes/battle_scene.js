import { Character } from "../classes/character.js";
import { Sprite } from "../classes/sprite.js";
import { ENEMY_POSITIONS } from "../constants/characters/enemies.js";
import { randomInt, randomizeList } from "../utils/random.js";

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
var stage;
var characters = {
    ally1: null,
    ally2: null,
    ally3: null,
    enemy1: null,
    enemy2: null,
    enemy3: null
};

var allyCount;
var enemyCount;
var currentAlly = 1;

// Create battle
export function createBattle(stg, allies) {
    stage = {
        background: new Sprite(stg),
        music: stg.music.battle
    };

    allyCount = allies.length;
    allies.forEach((value, i) => {
        characters[`ally${i + 1}`] = {
            character: value,
            choice: {
                attack: null,
                target: null
            }
        };
    });

    var enemies = generateEnemies(stg, 3);
    enemyCount = 3;
    enemies.forEach((value, i) => {
        characters[`enemy${i + 1}`] = value
    });
}

// Enemy generation
function generateEnemies(stage, count) {
    var enemies = [];

    for(var i = 0; i < count; i++) {
        const enemiesCount = stage.enemies.length;
        const enemy = stage.enemies[randomInt(0, enemiesCount-1)];

        enemies.push({
            character: new Character({
                ...enemy, 
                position: ENEMY_POSITIONS[Object.keys(ENEMY_POSITIONS)[i]]
            }),
            choice: {
                attack: null,
                target: null
            }
        });
    }

    return enemies;
}

// Start battle
export function initBattle() {
    // stage.music.play();

    // Initialize UI
    initUI();

    displayChoices();
    animate();
}

// Animate battle
function animate() {
    var frameId = requestAnimationFrame(animate);

    // Draw Sprites
    stage.background.draw();
    for (const [key, value] of Object.entries(characters)) {
        if(value == null) continue;

        const char = value.character;
        char.draw();

        if(char.health == 0) {
            characters[key] = null;
            const type = key.slice(0, key.length - 1);
            const uiElement = ui[type][key.charAt(key.length - 1) - 1];
            gsap.to(`#${key}-container`, {
                opacity: 0,
                duration: 0.25
            });
            continue;
        }

        // Update Healthbars
        const type = key.slice(0, key.length - 1);
        const uiElement = ui[type][key.charAt(key.length - 1) - 1];

        uiElement.healthbar.style.width = `${Math.floor(char.health * 100 / char.maxHealth)}%`;
        uiElement.health.innerHTML = `${Math.floor(char.health)} / ${char.maxHealth}`;
    }
}

function finishRound() {
    // Random enemy attacks

    for (const [key, value] of Object.entries(characters).slice(3)) {
        if(value == null) continue;

        const index = value.character.attacks.length;
        const attack = value.character.attacks[randomInt(0, index - 1)];
        const target = characters[`ally${randomInt(1, allyCount)}`].character;

        characters[key].choice = {
            attack: attack,
            target: target
        };
    }

    // Random attack order
    var order = Object.keys(characters);
    order = randomizeList(order);

    // Execute attack order
    proceedOrder(order, 0);
}

function proceedOrder(order, index) {
    // Order Finished
    if(index > order.length - 1) {
        // Reset attacks chosen
        for (const [key, value] of Object.entries(characters)) {
            if(value == null) continue;

            characters[key].choice = {
                attack: null,
                target: null
            };
        }
        currentAlly = 1;
        displayChoices();

        return;
    }

    if(characters[order[index]] == null) proceedOrder(order, index+1);

    const attacker = characters[order[index]].character;
    const choice = characters[order[index]].choice;

    if(choice.target.health != 0 && attacker.health != 0) {
        attacker.attack(choice);
        setTimeout(() => {
            proceedOrder(order, index + 1);
        }, 1500);
    }
    else {
        proceedOrder(order, index + 1);
    }
}

function initUI() {
    // Enable Ally Healthbars
    ui.ally.forEach((value, i) => {
        if(characters[`ally${i + 1}`] != null) {
            value.container.style.opacity = 1;
        }
    });

    // Enable Enemy Healthbars
    ui.enemy.forEach((value, i) => {
        if(characters[`enemy${i + 1}`] != null) {
            value.container.style.opacity = 1;
        }
    });
}

function displayChoices() {
    ui.targets.style.display = "grid";
    ui.attacks.style.display = "grid";

    // Targets list
    ui.targets.innerHTML = '';
    for(const [key, value] of Object.entries(characters).slice(3)) {
        if(value == null) continue;

        const char = value.character;
        const button = document.createElement('button');
        button.classList.add("option");
        button.innerHTML = char.name;

        button.onclick = () => {
            ui.targets.childNodes.forEach(child => {
                child.classList.remove("selected");
            });
            button.classList.add("selected");

            if(ui.attacks.style.display == "none")
                ui.attacks.style.display = "grid";

            // Save Target choice
            characters[`ally${currentAlly}`].choice.target = characters[key].character;
        }
        
        ui.targets.append(button);
    }

    // Attacks List
    ui.attacks.style.display = "none";
    ui.attacks.innerHTML = '';

    characters[`ally${currentAlly}`].character.attacks.forEach(attack => {
        const button = document.createElement('button');
        button.className = "option";
        button.style.color = attack.type.color;
        button.innerHTML = attack.name + "</br>" + "<div style=\"color: white; font-size: 10px; margin-top: 4px\">" + "Damage: " + attack.damage + "</div>";

        button.onclick = () => {
            // Save Attack Choice
            characters[`ally${currentAlly}`].choice.attack = attack;

            if(currentAlly == allyCount) {
                ui.targets.style.display = "none";
                ui.attacks.style.display = "none";
                finishRound();
                return;
            }

            currentAlly++;
            displayChoices();
        };
        
        document.querySelector('#attacks-box').append(button);
    });
}