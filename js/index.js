import * as constants from "./helpers/constants.js"
import { FrameCounter } from "./interface/frame-counter.js";

const cnv = document.getElementById("game");
const ctx = cnv.getContext("2d");

cnv.width = innerWidth;
cnv.height = innerHeight;

// Utility
var frameC = new FrameCounter(ctx, 10, 20, "#f00");

// Map
var tileH = constants.TILE_HEIGHT, tileW = constants.TILE_WIDTH;
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
    var tileCount = mapW * mapH;

    for(var i = 0; i < tileCount; i++)
    {
        gameMap.push(Math.round(Math.random()));
    }
}
