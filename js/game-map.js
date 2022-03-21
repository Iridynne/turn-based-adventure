import * as constants from "./config/constants.js"
import { Array } from "./utils/array.js";

export class Map {
    constructor() {
        this.data = [];
        this.height = constants.MAP_HEIGHT;
        this.width = constants.MAP_WIDTH;
    }

    draw(ctx) {
        var margin = constants.TILE_MARGIN;
        var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;

        for(var y = 0; y < this.height; y++) {
            for(var x = 0; x < this.width; x++) {
                switch(this.data[y][x]) {
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
                ctx.fill(path)
            }
        }

    }

    generate() {
        var maxLength = constants.TUNNEL_LENGTH, maxTunnels = constants.TUNNEL_COUNT;
        this.data = Array.create(1, this.height, this.width);
    
        var currentRow = Math.floor(Math.random() * this.height),
            currentColumn = Math.floor(Math.random() * this.width);
    
        var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        var lastDirection = [], randomDirection;
    
        while(maxTunnels && maxLength) {
            // Pick a random valid direction
            do {
                randomDirection = directions[Math.floor(Math.random() * directions.length)];
            }while((randomDirection[0] === -lastDirection[0] &&    
                randomDirection[1] === -lastDirection[1]) || 
            (randomDirection[0] === lastDirection[0] &&  
                randomDirection[1] === lastDirection[1]));
    
            // Create tunnel with random length
            var randomLength = Math.ceil(Math.random() * maxLength), tunnelLength = 0;
    
            while (tunnelLength < randomLength) { 
                if(((currentRow === 0) && (randomDirection[0] === -1))||  
                ((currentColumn === 0) && (randomDirection[1] === -1))|| 
                ((currentRow === this.height - 1) && (randomDirection[0] ===1))||
                ((currentColumn === this.width - 1) && (randomDirection[1] === 1)))   
                { break; }
                else{ 
                    this.data[currentRow][currentColumn] = 0; 
                    currentRow += randomDirection[0];
                    currentColumn += randomDirection[1]; 
                    tunnelLength++; 
                } 
            }
    
            if (tunnelLength) { 
                lastDirection = randomDirection; 
                maxTunnels--; 
            }
        }
    }
}