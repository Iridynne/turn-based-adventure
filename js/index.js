import * as constants from "./config/constants.js"
import {Array} from "./utils/array.js"
import { FramesCounter } from "./interface/frames-counter.js";

const cnv = document.querySelector("canvas");
const ctx = cnv.getContext("2d");

cnv.width = innerWidth;
cnv.height = innerHeight;

ctx.fillStyle = constants.COLOR_3;
ctx.fillRect(0, 0, cnv.width, cnv.height);

// Map
var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;
var mapW = constants.MAP_WIDTH, mapH = constants.MAP_HEIGHT;
var gameMap = [];

// Utility
var framesCounter = new FramesCounter(ctx, 10, 20, constants.COLOR_4);

// Initialization
window.onload = function () {
    generateMap();
    requestAnimationFrame(drawGame);
    ctx.font = constants.DEFAULT_FONT;
}

var mousePos = null;
cnv.onmousemove = function(event) {
    mousePos = {
        x: Math.floor(event.pageX / tileW),
        y: Math.floor(event.pageY / tileH)
    };
    console.log(mousePos)
}

cnv.onmousedown = function() {

}

function drawGame() {
    if(ctx == null) return;

    var margin = constants.TILE_MARGIN;;
    for(var y = 0; y < mapH; y++) {
        for(var x = 0; x < mapW; x++) {
            switch(gameMap[y][x]) {
                case 0:
                    ctx.fillStyle = constants.COLOR_2;
                    break;
                case 2:
                    ctx.fillStyle = constants.COLOR_4;
                    break;
                default:
                    ctx.fillStyle = constants.COLOR_1;
            }
            var path = new Path2D();
            path.rect(x*tileW + (x+1) * margin, y*tileH + (y+1) * margin, tileW, tileH);
            if((mousePos != null && mousePos.x === x && mousePos.y === y))
                ctx.fillStyle = constants.COLOR_3;
            ctx.fill(path)
        }
    }

    framesCounter.draw();
    requestAnimationFrame(drawGame);
}

// Generates Map based on constants
function generateMap() {
    var maxLength = constants.TUNNEL_LENGTH, tunnelCount = constants.TUNNEL_COUNT;
    gameMap = Array.create(1, mapH, mapW);

    var currentRow = Math.floor(Math.random() * mapH),
        currentColumn = Math.floor(Math.random() * mapW);

    var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    var lastDirection = [], randomDirection;

    while(tunnelCount && maxLength) {
        do {
            randomDirection = directions[Math.floor(Math.random() * directions.length)];
        }while((randomDirection[0] === -lastDirection[0] &&    
            randomDirection[1] === -lastDirection[1]) || 
        (randomDirection[0] === lastDirection[0] &&  
            randomDirection[1] === lastDirection[1]));

        var randomLength = Math.ceil(Math.random() * maxLength), tunnelLength = 0;

        while (tunnelLength < randomLength) { 
            if(((currentRow === 0) && (randomDirection[0] === -1))||  
            ((currentColumn === 0) && (randomDirection[1] === -1))|| 
            ((currentRow === mapH - 1) && (randomDirection[0] ===1))||
            ((currentColumn === mapW - 1) && (randomDirection[1] === 1)))   
            { break; }
            else{ 
                gameMap[currentRow][currentColumn] = 0; 
                currentRow += randomDirection[0];
                currentColumn += randomDirection[1]; 
                tunnelLength++; 
            } 
        }

        if (tunnelLength) { 
            lastDirection = randomDirection; 
            tunnelCount--; 
        }
    }
}