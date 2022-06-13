import { Game } from "./game.js";
import { wait } from "./utils/timer.js"
import * as general from "./constants/general.js"
import { Battle } from "./encounters/battle.js";
import { loadData } from "./utils/data.js";
import { ARROW } from "./constants/misc.js";
import { Sprite } from "./classes/sprite.js";
import { fadeIn, fadeOut } from "./utils/audio_utils.js";
import { MUSIC } from "./constants/audio.js";

// Canvas
export function setupCanvas() {
    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");

    // Set Canvas Size
    cnv.width = 1024;
    cnv.height = 576;

    // Font + Image Scaling
    ctx.font = general.DEFAULT_FONT;
    ctx.imageSmoothingEnabled = false;
}

export function clearCanvas() {
    const cnv = document.querySelector("canvas");
    const ctx = cnv.getContext("2d");

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
    fadeOut(MUSIC.MAIN_MENU);
    hideMainMenu();
    var game = new Game();
    game.start();
}

function loadGame() {
    fadeOut(MUSIC.MAIN_MENU);
    hideMainMenu();
    loadData();
    Game.currentGame.start();
}

export function setupMainMenu () {
    clearCanvas();
    const newGameBtn = document.querySelector("#new-game");
    const loadGameBtn = document.querySelector("#load-game");

    newGameBtn.onclick = newGame;

    const saveData = localStorage.getItem("saveData");
    if(saveData !== null) {
        loadGameBtn.onclick = loadGame;
    }
    else
        loadGameBtn.disabled = true;

    showMainMenu();

    if(playedMusic)
        fadeIn(MUSIC.MAIN_MENU);
}

let playedMusic = false;
addEventListener("click", () => {
    if(!playedMusic) fadeIn(MUSIC.MAIN_MENU);
    playedMusic = true;
});

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

export function showTransitionOptions(showContinue = false, showExit = false) {
    const transitionOptions = document.querySelector("#transition-options");
    const continueBtn = document.querySelector("#continue");
    const exitBtn = document.querySelector("#exit");

    transitionOptions.style.display = showContinue || showExit? "grid" : "none";
    continueBtn.style.display = showContinue? "inline" : "none";
    exitBtn.style.display = showExit? "inline" : "none";

    continueBtn.onclick = () => {
        hideTransitionOptions();
        Game.currentGame.start();
    };
    exitBtn.onclick = () => {
        hideTransitionOptions();
        Game.currentGame.end();
    }
}

export function hideTransitionOptions() {
    const transitionOptions = document.querySelector("#transition-options");

    transitionOptions.style.display = "none";
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

export function enableDialogueClick() {
    const dialogueBox = document.querySelector("#dialogue-box");
    dialogueBox.style.pointerEvents = "auto";
}

export function disableDialogueClick() {
    const dialogueBox = document.querySelector("#dialogue-box");
    dialogueBox.style.pointerEvents = "none";
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
            currentBattle.choices.push({
                attacker: currentBattle.allies[index],
                attack: attack,
                target: null
            });

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

// Selected Target Arrow
var arrow = new Sprite(ARROW);
var animationFrame;
function animate() {
    animationFrame = requestAnimationFrame(animate);
    arrow.draw();
}

export function setupTargets(characters) {
    const targetsBox = document.querySelector("#targets-box");

    targetsBox.innerHTML = '';
    characters.forEach(char => {
        if(char != null) {
            const button = document.createElement('button');
            button.classList.add("option");
            button.innerHTML = char.name;

            // On Click
            button.onclick = () => {
                if(button.classList.contains("selected")) return;

                // Set Target Choice
                const currentBattle = Battle.currentBattle;
                const index = currentBattle.choices.length;
                currentBattle.choices[index-1].target = char;

                // Disable button & Enable others
                // targetsBox.childNodes.forEach(child => {
                //     child.classList.remove("selected");
                // });
                // button.classList.add("selected");

                // Disable AttacksBox, TargetsBox & AllyLabel
                hideAttacks();
                hideTargets();
                hideAllyLabel();


                // Hide Target Arrow
                cancelAnimationFrame(animationFrame);

                // Advance order
                currentBattle.currentAlly++;
                currentBattle.displayChoices();
            };

            // Mouse Over
            button.onmouseenter = () => {
                arrow.position = {
                    x: char.position.x,
                    y: char.position.y - 160
                };
                animate();
            };

            button.onmouseleave = () => cancelAnimationFrame(animationFrame);
            
            targetsBox.append(button);
        }
    });

    showTargets();
}

export function showAllyLabel(character) {
    const name = document.querySelector("#ally-label");
    name.innerHTML = character.name;
    name.style.display = "flex";
}

export function hideAllyLabel() {
    const name = document.querySelector("#ally-label");
    name.style.display = "none";
}

// Healthbars
function showHealthbar(character) {
    const id = character.healthbarId;
    const container = document.querySelector(`#${id}-container`);
    container.style.opacity = 1;
}

export function hideHealthbar(
    character,
    params = {
        delay: 0,
        duration: 0.5,
        onComplete: () => {}
    }
) {
    gsap.to(character.healthUI.container.style, {
        ...params,
        opacity: 0
    });
}

export function setupHealthbars(characters) {
    characters.forEach(char => {
        showHealthbar(char);
        updateHealthbar(char);
    });
}

export function hideHealthbars() {
    for(var i=1; i<=3; i++) {
        document.querySelector(`#ally${i}-container`).style.opacity = 0;
        document.querySelector(`#enemy${i}-container`).style.opacity = 0;
    }
}

export function updateHealthbar(character) {
    const id = character.healthbarId;
    const healthbar = document.querySelector(`#${id}-healthbar`);
    const health = document.querySelector(`#${id}-health`);

    healthbar.style.width = `${Math.floor(character.health * 100 / character.maxHealth)}%`;
    health.innerHTML = `${Math.floor(character.health)} / ${character.maxHealth}`;
}

export function updateHealthbars(characters) {
    characters.forEach(char => {
        updateHealthbar(char);
    });
}