import { Game } from "./game.js";
import { wait } from "./utils/timer.js"
import * as general from "./constants/general.js"
import { Battle } from "./scenes/battle_scene.js";

// Canvas
export function canvasSetup() {
    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");

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

// Main Menu
function showMainMenu() {
    const menu = document.querySelector("#main-menu");
    menu.style.display = "grid";
}

function hideMainMenu() {
    const menu = document.querySelector("#main-menu");
    menu.style.display = "none";
}

function newGame() {
    hideMainMenu();
    var game = new Game();
    game.start();
}

export function setupMainMenu () {
    const newGameBtn = document.querySelector("#new-game");
    const loadGameBtn = document.querySelector("#load-game");

    newGameBtn.onclick = newGame;
    loadGameBtn.disabled = true;

    showMainMenu();
}

// Transition Overlay
const transitionDelay = 0.5;
const transitionDuration = 0.5;

export function showTransition(
    title, 
    subtitle, 
    params = {
        delay: 0,
        duration: 0,
        onComplete: () => {}
    }
) {
    const titleLabel = document.querySelector("#transition-title");
    const subtitleLabel = document.querySelector("#transition-subtitle");

    titleLabel.innerHTML = title;
    subtitleLabel.innerHTML = subtitle;

    var transition = {
        ...params,
        opacity: 1
    };

    document.querySelector("#transition-overlay").style.visibility = "visible";

    gsap.to("#transition-overlay", transition);
}

export function hideTransition(
    params = {
        delay: transitionDelay,
        duration: transitionDuration,
        onComplete: () => {}
    }
) {
    var transition = {
        ...params,
        opacity: 0
    };

    gsap.to("#transition-overlay", transition);
    var waitDuration = params.delay + params.duration;
    wait(waitDuration * 1000).then(() => {
        document.querySelector("#transition-overlay").style.visibility = "hidden";
    });
}

// Encounter Menu
export function showEncounterMenu() {
    const menu = document.querySelector("#encounter-menu");
    menu.style.opacity = 1;
}

export function hideEncounterMenu() {
    const menu = document.querySelector("#encounter-menu");
    menu.style.opacity = 0;

    hideDialogue();
    hideAttacks();
    hideTargets();
}

// Dialogue Box
export function showDialogue(text, onClick) {
    const dialogueBox = document.querySelector("#dialogue-box");
    dialogueBox.innerHTML = text;
    dialogueBox.style.visibility = "visible";
    dialogueBox.onclick = onClick;
}

export function hideDialogue() {
    const dialogueBox = document.querySelector("#dialogue-box");
    dialogueBox.style.visibility = "hidden";
}

// Attack Box
function showAttacks() {
    const attacksBox = document.querySelector("#attacks-box");
    attacksBox.style.visibility = "visible";
}

export function hideAttacks() {
    const attacksBox = document.querySelector("#attacks-box");
    attacksBox.style.visibility = "hidden";
}

export function setupAttacks(attacks) {
    const attacksBox = document.querySelector("#attacks-box");

    attacksBox.innerHTML = '';
    attacks.forEach(attack => {
        const button = document.createElement('button');
        button.className = "option";
        button.style.color = attack.type.color;
        button.innerHTML = attack.name + "</br>" + "<div style=\"color: white; font-size: 10px; margin-top: 4px\">" + "Damage: " + attack.damage + "</div>";
        button.value = attack;

        button.onclick = (event) => {
            if(button.classList.contains("selected")) return;

            // Set Attack Choice
            const currentBattle = Battle.currentBattle;
            const index = currentBattle.currentAlly;
            currentBattle.choices[`ally${index + 1}`] = {
                attack: attack,
                target: null
            };

            // Disable button & Enable others
            attacksBox.childNodes.forEach(child => {
                child.classList.remove("selected");
            });
            button.classList.add("selected");

            setupTargets(currentBattle.enemies);
        };
        
        attacksBox.append(button);
    });

    showAttacks();
}

// Targets Box
function showTargets() {
    const targetsBox = document.querySelector("#targets-box");
    targetsBox.style.visibility = "visible";
}

export function hideTargets() {
    const targetsBox = document.querySelector("#targets-box");
    targetsBox.style.visibility = "hidden";
}

export function setupTargets(characters) {
    const targetsBox = document.querySelector("#targets-box");

    targetsBox.innerHTML = '';
    characters.forEach(char => {
        if(char != null) {
            const button = document.createElement('button');
            button.classList.add("option");
            button.innerHTML = char.name;

            button.onclick = () => {
                if(button.classList.contains("selected")) return;

                // Set Target Choice
                const currentBattle = Battle.currentBattle;
                const index = currentBattle.currentAlly;
                currentBattle.choices[`ally${index+1}`].target = char;

                // Disable button & Enable others
                targetsBox.childNodes.forEach(child => {
                    child.classList.remove("selected");
                });
                button.classList.add("selected");

                // Disable AttacksBox & TargetsBox
                hideAttacks();
                hideTargets();

                // Advance order
                currentBattle.currentAlly++;
                currentBattle.displayChoices();
            };
            
            targetsBox.append(button);
        }
    });

    showTargets();
}

// Healthbars
function showHealthbar(character) {
    character.healthUI.container.style.opacity = 1;
}

export function hideHealthbar(character) {
    character.healthUI.container.style.opacity = 0;
}

export function setupHealthbars(characters) {
    characters.forEach(char => {
        showHealthbar(char);
        updateHealthbar(char);
    });
}

export function updateHealthbar(character) {
    character.healthUI.healthbar.style.width = `${Math.floor(character.health * 100 / character.maxHealth)}%`;
    character.healthUI.health.innerHTML = `${Math.floor(character.health)} / ${character.maxHealth}`;
}

export function updateHealthbars(characters) {
    characters.forEach(char => {
        updateHealthbar(char);
    });
}