import { Game } from "./game.js";
import * as ui from "./ui.js"

window.onload = () => {
    ui.canvasSetup();
    ui.setupMainMenu();
    // debug();
};

function debug() {
    var game = new Game();
    game.start();
}