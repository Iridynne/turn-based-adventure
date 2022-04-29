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
var background;
var music;
var allies;
var enemies = [];
var isBossFight;

var currentAlly = 0;
var attacksChosen = [];

export function createBattle(stage, allyList) {
    background = new Sprite(stage);
    music = stage.music.battle;
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

    allies.forEach(() => {
        attacksChosen.push({
            target: null,
            attack: null
        });
    });
}

export function createBossBattle(stage, allies) {

}

export function initBattle() {
    music.play();

    updateUI();

    animate();
}

function animate() {
    var frameId = requestAnimationFrame(animate);

    // Draw Sprites
    background.draw();
    allies.forEach(ally => {
        ally.draw();
    });
    enemies.forEach(enemy => {
        enemy.draw();
    });

    // Draw Ally healthbars
    allies.forEach(ally => {
        const position = allies.indexOf(ally);

        const health = ally.health;
        const maxHealth = ally.maxHealth;
        if(health > 0) {
            ui.ally[position].healthbar.style.width = `${Math.floor(100 * health / maxHealth)}%`;
            ui.ally[position].health.innerHTML = `${Math.floor(health)} / ${maxHealth}`;
        }
        else {
            ui.ally[position].container.style.opacity = 0;
        }
    });

    // Draw Enemy healthbars
    enemies.forEach(enemy => {
        const position = enemies.indexOf(enemy);

        const health = enemy.health;
        const maxHealth = enemy.maxHealth;

        if(health > 0) {
            ui.enemy[position].healthbar.style.width = `${Math.floor(100 * health / maxHealth)}%`;
            ui.enemy[position].health.innerHTML = `${Math.floor(health)} / ${maxHealth}`;
        }
        else {
            ui.enemy[position].container.style.opacity = 0;
        }
    });
}

function finishRound() {
    // Random attack order
    var order = [];

    allies.forEach(ally => {
        order.push({
            name: `ally${allies.indexOf(ally)}`
        });
    });

    enemies.forEach(enemy => {
        order.push({
            name: `enemy${enemies.indexOf(enemy)}`
        });
    })

    order = randomizeList(order);

    // Execute each attack if character can attack
    order.forEach(char => {
        const length = char.name.length;
        const index = char.name.charAt(length-1);

        if(char.name.startsWith("ally")) {
            const choice = attacksChosen[index];
            char.attacker = allies[index]
            
            if(allies[index].health != 0)
                char.choice = choice;
            else 
                char.choice = null;
        }
        else {
            const attackCount = enemies[index].attacks.length;
            const allyCount = allies.length;
            if(attackCount > 0 && allyCount > 0) {
                const attack = enemies[index].attacks[randomInt(0, attackCount-1)];
                var target = allies[randomInt(0, allyCount-1)];
                while(target.health == 0) {
                    target = target = allies[randomInt(0, allyCount-1)];
                }

                char.attacker = enemies[index];

                if(enemies[index].health != 0)
                    char.choice = {
                        attack: attack,
                        target: target
                    };
                else 
                    char.choice = null;
            }
        }
    });

    proceedOrder(order, 0);
}

function proceedOrder(order, index) {
    // Order Finished
    if(index > order.length - 1) {
        // Reset attacks chosen
        attacksChosen = [];
        allies.forEach(() => {
            attacksChosen.push({
                target: null,
                attack: null
            });
        });
        updateUI();

        return;
    }

    const attacker = order[index].attacker;
    const choice = order[index].choice;

    if(choice != null && choice.target.health != 0 && attacker.health != 0) {
        attacker.attack(choice);
        setTimeout(() => {
            proceedOrder(order, index+1);
        }, 1500);
    }
    else {
        proceedOrder(order, index+1);
    }
}

// Verify All allies chose an attack
function verifyAllChosen() {
    var ok = true;

    attacksChosen.forEach(choice => {
        if(choice.attack == null || choice.target == null) {
            ok = false;
        }
    });

    return ok;
}

function updateUI() {
    if(verifyAllChosen() == true) {
        ui.targets.style.opacity = 0;
        ui.attacks.style.opacity = 0;

        finishRound();
        return;
    }

    ui.targets.style.opacity = 1;

    // Targets list
    ui.targets.innerHTML = '';
    enemies.forEach(element => {
        if(element.health > 0) {
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
                attacksChosen[currentAlly].target = element;
            }
            
            ui.targets.append(button);
        }
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
            attacksChosen[currentAlly].attack = element;

            currentAlly = currentAlly == allies.length-1 ? 0 : currentAlly+1;
            updateUI();
        };
        
        document.querySelector('#attacks-box').append(button);
    });
}