import { Game } from "./game.js";
import * as general from "./constants/general.js"

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
const transitionDelay = 0.25;
const transitionDuration = 0.5;

export function showTransition(title, subtitle, onComplete) {
    const titleLabel = document.querySelector("#transition-title");
    const subtitleLabel = document.querySelector("#transition-subtitle");

    titleLabel.innerHTML = title;
    subtitleLabel.innerHTML = subtitle;

    var transition = {
        opacity: 1,
        delay: transitionDelay,
        duration: transitionDuration
    };

    if(typeof onComplete === "function")
        transition.onComplete = onComplete;

    gsap.to("#transition-overlay", transition);
}

export function hideTransition(onComplete) {
    var transition = {
        opacity: 0,
        delay: transitionDelay,
        duration: transitionDuration
    };

    if(typeof onComplete === "function")
        transition.onComplete = onComplete;

    gsap.to("#transition-overlay", transition);
}

// Encounter Menu
export function showEncounterMenu() {
    const menu = document.querySelector("#encounter-menu");
    menu.style.opacity = 1;
}

export function hideEncounterMenu() {
    const menu = document.querySelector("#encounter-menu");
    menu.style.opacity = 0;
}

// Dialogue Box
export function showDialogue(text) {
    const dialogueBox = document.querySelector("#dialogue-box");
    dialogueBox.innerHTML = text;
    dialogueBox.style.display = "inline";
}

export function hideDialogue() {
    const dialogueBox = document.querySelector("#dialogue-box");
    dialogueBox.style.display = "none";
}

// Attack Box
function showAttacks() {
    const attacksBox = document.querySelector("#attacks-box");
    attacksBox.style.display = "grid";
}

export function hideAttacks() {
    const attacksBox = document.querySelector("#attacks-box");
    attacksBox.style.display = "none";
}

export function setupAttacks(attacks) {
    const attacksBox = document.querySelector("#attacks-box");

    attacks.forEach(attack => {
        const button = document.createElement('button');
        button.className = "option";
        button.style.color = attack.type.color;
        button.innerHTML = attack.name + "</br>" + "<div style=\"color: white; font-size: 10px; margin-top: 4px\">" + "Damage: " + attack.damage + "</div>";

        button.onclick = () => {};
        
        attacksBox.append(button);
    });

    showAttacks();
}

// Targets Box
function showTargets() {
    const targetBox = document.querySelector("#targets-box");
    targetBox.style.display = "grid";
}

export function hideTargets() {
    const targetBox = document.querySelector("#targets-box");
    targetBox.style.display = "none";
}

export function setupTargets(characters) {
    const targetBox = document.querySelector("#targets-box");

    targetBox.innerHTML = '';
    for(const [key, value] of Object.entries(characters).slice(3)) {
        if(value == null) continue;

        const char = value.character;
        const button = document.createElement('button');
        button.classList.add("option");
        button.innerHTML = char.name;

        button.onclick = () => {};
        
        targetBox.append(button);
    }

    showTargets();
}

// Healthbars
function showHealthbar(name) {
    const container = document.querySelector(`#${name}-container`);
    container.style.opacity = 1;
}

export function hideHealthbar(name) {
    const container = document.querySelector(`#${name}-container`);
    container.style.opacity = 0;
}

export function setupHealthbars(allies, enemies) {
    allies.forEach((value, i) => {
        showHealthbar(`ally${i+1}`);
    });

    enemies.forEach((value, i) => {
        showHealthbar(`enemy${i+1}`);
    });
}

export function updateHealthbar(name, character) {
    const healthbar = document.querySelector(`#${name}-healthbar`);
    const health = document.querySelector(`#${name}-health`);

    healthbar.style.width = `${Math.floor(character.health * 100 / character.maxHealth)}%`;
    health.innerHTML = `${Math.floor(character.health)} / ${character.maxHealth}`;
}