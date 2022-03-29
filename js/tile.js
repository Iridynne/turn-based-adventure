import * as constants from "./config/constants.js"

export class Tile {
    static level = constants.LEVELS[0];

    static draw(ctx, pos, index) {
        var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, pos.x, pos.y);
        }
        img.src = this.level.tiles[index];
    }

    static drawRoom(ctx, pos, indexes) {
        var size = constants.ROOM_SIZE;
        var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;
        for(var i=0;i<size;i++) {
            for(var j=0;j<size;j++) {
                var pos1 = {
                    x: pos.x + j * tileW,
                    y: pos.y + i * tileH
                };
                this.draw(ctx, pos1, indexes[i][j]);
            }
        }
    }
}