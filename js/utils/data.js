import { Character } from "../classes/character.js";
import { ALLIES } from "../constants/characters/allies.js";
import { BOSSES } from "../constants/characters/bosses.js";
import { ENEMIES } from "../constants/characters/enemies.js";
import { Game } from "../game.js";

export function saveData(game) {
    const data = {
        ...game,
        allies: game.allies.map(ally => getCharacterData(ally))
    };
    localStorage.setItem("saveData",JSON.stringify(data));
}

export function loadData() {
    const data = JSON.parse(localStorage.getItem("saveData"));
    var game = new Game();
    // Load Allies
    const allies = data.allies.map(data => {
        const char = getCharById(data.charId);
        var ally = new Character({...char, ...data.props});
        ally.health = data.health;

        return ally;
    });
    game.allies = allies;

    // Load Stage & Encounter info
    game.encounterCount = data.encounterCount;
    game.stageCount = data.stageCount;
    game.currentEncounter = data.currentEncounter;
    game.currentStage = data.currentStage;

    Game.currentGame = game;
}

export function deleteData() {
    localStorage.removeItem("saveData");
}

function getCharacterData(char) {
    const data = {
        charId: getCharIdByName(char.name),
        health: char.health,
        props: {
            position: {
                x: char.position.x,
                y: char.position.y
            },
            healthbarId: char.healthbarId,
            mirror: char.mirror
        }
    };
    return data;
}

function getCharIdByName(name) {
    for(const [key, value] of Object.entries({...ENEMIES, ...BOSSES, ...ALLIES})) {
        if(value.name === name) {
            return key;
        }
    }
}

function getCharById(id) {
    for(const [key, value] of Object.entries({...ENEMIES, ...BOSSES, ...ALLIES})) {
        if(key === id) {
            return value;
        }
    }
}