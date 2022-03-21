import * as constants from "./config/constants.js"
import * as utils from "./utils.js";
import { Tile } from "./tiles.js";

export class Map {
    constructor() {
        this.tiles = [];
        this.entities = [];
        this.height = constants.MAP_HEIGHT;
        this.width = constants.MAP_WIDTH;
    }

    draw(ctx) {
        for(var y = 0; y < this.height; y++) {
            for(var x = 0; x < this.width; x++) {
                var value = this.tiles[y][x];

                var pos = {
                    x: x,
                    y: y
                };
                Tile.draw(ctx, pos, value);
                var img = new Image();
                img.src = constants.LEVELS[0].entities[this.entities[y][x]];
                ctx.drawImage(img, x*64, y*64);
            }
        }
    }

    generate() {
        this.#generateMap();
        this.#generateEnemies();
    }

    #generateEnemies() {
        var enemyCount = utils.getRandomInRange(constants.MIN_ENEMY_COUNT, constants.MAX_ENEMY_COUNT);
        this.entities = utils.createArray(-1, this.height, this.width);

        while(enemyCount) {
            var currentRow = Math.floor(Math.random() * this.height),
            currentColumn = Math.floor(Math.random() * this.width);

            if(this.tiles[currentRow][currentColumn] === 0 && this.entities[currentRow][currentColumn] < 0) {
                this.entities[currentRow][currentColumn] = Math.floor(Math.random() * constants.LEVELS[0].entities.length);
                enemyCount--;
            }
        }
    }

    #generateMap() {
        var minLength = constants.MIN_TUNNEL_LENGTH, maxLength = constants.MAX_TUNNEL_LENGTH;
        var minTunnels = constants.MIN_TUNNEL_COUNT, maxTunnels = constants.MAX_TUNNEL_COUNT;
        this.tiles = utils.createArray(1, this.height, this.width);
    
        var currentRow = Math.floor(Math.random() * this.height),
            currentColumn = Math.floor(Math.random() * this.width);
    
        var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        var lastDirection = [], randomDirection;

        var tunnelCount = utils.getRandomInRange(minTunnels, maxTunnels);
    
        while(tunnelCount) {
            // Pick a random valid direction
            do {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
            }while((randomDirection[0] === -lastDirection[0] &&    
                randomDirection[1] === -lastDirection[1]) || 
            (randomDirection[0] === lastDirection[0] &&  
                randomDirection[1] === lastDirection[1]));
    
            // Create tunnel with random length
            var randomLength = utils.getRandomInRange(minLength, maxLength), tunnelLength = 0;
    
            while (tunnelLength < randomLength) { 
                if(((currentRow === 0) && (randomDirection[0] === -1))||  
                ((currentColumn === 0) && (randomDirection[1] === -1))|| 
                ((currentRow === this.height - 1) && (randomDirection[0] ===1))||
                ((currentColumn === this.width - 1) && (randomDirection[1] === 1)))   
                { break; }
                else{ 
                    this.tiles[currentRow][currentColumn] = 0; 
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
}