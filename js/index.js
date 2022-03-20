import * as constants from "./helpers/constants.js"
import { FramesCounter } from "./interface/frames-counter.js";

const cnv = document.getElementById("game");
const ctx = cnv.getContext("2d");

cnv.width = innerWidth;
cnv.height = innerHeight;

// Utility
var frameC = new FramesCounter(ctx, 10, 20, "#f00");

// Map
var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;
var mapW = constants.MAP_WIDTH, mapH = constants.MAP_HEIGHT;
var gameMap = [];

// Initialization
window.onload = function () {
    generateMap();
    requestAnimationFrame(drawGame);
    ctx.font = constants.DEFAULT_FONT;
}

function drawGame() {
    if(ctx == null) return;

    for(var y = 0; y < mapH; y++) {
        for(var x = 0; x < mapW; x++) {
            switch(gameMap[y*mapW+x]) {
                case 0:
                    ctx.fillStyle = "#999";
                    break;
                default:
                    ctx.fillStyle = "#eee";
            }

            ctx.fillRect(x*tileW, y*tileH, tileW, tileH)
        }
    }

    frameC.display();

    requestAnimationFrame(drawGame);
}

function generateMap() {
    
}
