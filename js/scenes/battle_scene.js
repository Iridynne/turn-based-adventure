import { Character } from "../classes/character.js";
import { Sprite } from "../classes/sprite.js";
import { ENEMY_POSITIONS } from "../constants/characters/enemies.js";
import { Game } from "../game.js";
import { randomInt, randomizeList, weightedRand } from "../utils/random.js";

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
var currentStage;
var currentEncounter;

var stage;
var characters = {
    ally1: null,
    ally2: null,
    ally3: null,
    enemy1: null,
    enemy2: null,
    enemy3: null
};

// Weights for enemy generation
var countWeights = weightedRand({1: 0.4, 2: 0.4, 3: 0.2});

var allyCount;
var enemyCount;
var currentAlly = 1;

// Create battle
export function createBattle(stg, allies) {
    stage = {
        name: stg.name,
        background: new Sprite(stg),
        music: stg.music.battle
    };

    currentStage = Game.currentGame.currentStage;
    currentEncounter = Game.currentGame.currentEncounter;

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

    var enemies = generateEnemies(stg);
    enemyCount = 3;
    enemies.forEach((value, i) => {
        characters[`enemy${i + 1}`] = value
    });
}

// Enemy generation
function generateEnemies(stage) {
    var enemies = [];

    var count = countWeights();

    for(var i = 0; i < count; i++) {
        const enemiesCount = stage.enemies.length;
        const enemy = stage.enemies[randomInt(0, enemiesCount-1)];

        enemies.push({
            character: new Character({
                ...enemy, 
                position: Object.entries(ENEMY_POSITIONS)[i][1]
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
    document.querySelector("#menu-container").style.opacity = 1;

    // Enter animation
    document.querySelector("#overlay-title").innerHTML = stage.name;
    document.querySelector("#overlay-subtitle").innerHTML = `${currentEncounter} - ${currentStage}`;
    stage.music.play();
    gsap.fromTo("#overlay-transition", {
        opacity: 1
    }, {
        opacity: 0,
        delay: 1,
        duration: 0.5,
        onComplete() {
            displayChoices();
        }
    })

    // Initialize UI
    initUI();
    animate();
}

var frameId;
// Animate battle
function animate() {
    frameId = requestAnimationFrame(animate);

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

// Display combat choices
function displayChoices() {
    // Verify Win/Loss
    if(verifyWinLoss()) return;
    
    if(currentAlly > allyCount) {
        ui.targets.style.display = "none";
        ui.attacks.style.display = "none";
        finishRound();
        return;
    }

    if(characters[`ally${currentAlly}`] == null) {
        currentAlly++;
        displayChoices();
        return;
    }

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

            currentAlly++;
            displayChoices();
        };
        
        document.querySelector('#attacks-box').append(button);
    });
}

// Verify if all enemies or all allies are dead
function verifyWinLoss() {
    var allies = Object.entries(characters).slice(0,3).filter(([key, value]) => value != null );
    if(allies.length == 0) {
        cancelAnimationFrame(frameId);
        document.querySelector("#menu-container").style.opacity = 0;
        document.querySelector("#overlay-title").innerHTML = "Defeat!";
        document.querySelector("#overlay-subtitle").innerHTML = "";
        gsap.to("#overlay-transition", {
            opacity: 1,
            duration: 0.5
        });
        stage.music.fade(stage.music.volume(), 0, 1000)
        return true;
    }
    var enemies = Object.entries(characters).slice(3).filter(([key, value]) => value != null );
    if(enemies.length == 0) {
        cancelAnimationFrame(frameId);
        document.querySelector("#menu-container").style.opacity = 0;
        document.querySelector("#overlay-title").innerHTML = "Victory!";
        document.querySelector("#overlay-subtitle").innerHTML = "";
        gsap.to("#overlay-transition", {
            opacity: 1,
            duration: 0.5
        });
        stage.music.fade(stage.music.volume(), 0, 1000)
        return true;
    }

    return false;
}

function finishRound() {
    // Random enemy attacks
    var allies = Object.entries(characters).slice(0,3).filter(([key, value]) => value != null );

    for (const [key, value] of Object.entries(characters).slice(3)) {
        if(value == null) continue;

        const index = value.character.attacks.length;
        const attack = value.character.attacks[randomInt(0, index - 1)];
        const target = allies[randomInt(0, allies.length-1)][1].character;

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

    if(characters[order[index]] == null) {
        proceedOrder(order, index+1);
        return;
    }

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