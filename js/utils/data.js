import { Game } from "../game.js";

const replacerFunc = () => {
    const visited = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
      }
      return value;
    };
};

export function saveData(game) {
    var allyHealth = [];
    game.allies.forEach(ally => allyHealth.push(ally.health));
    const data = {
        encounterCount: game.encounterCount,
        stageCount: game.stageCount,
        currentEncounter: game.currentEncounter,
        currentStage: game.currentStage,
        allyHealth: allyHealth
    };

    localStorage.setItem("saveData",JSON.stringify(data));
}

export function loadData() {
    const data = JSON.parse(localStorage.getItem("saveData"));
    var game = new Game();
    // Load Allies
    var length = data.allyHealth.length;
    if(length < game.allies.length)
        game.allies.slice(0,length);
    
    game.allies.forEach((value, i) => value.health = data.allyHealth[i]);

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