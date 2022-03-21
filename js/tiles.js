import * as constants from "./config/constants.js"

const tilesPath = "../img/tiles/";

export class Tile {
    static level = constants.LEVELS[0];

    static draw(ctx, pos, index) {
        var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;

        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, pos.x * tileW, pos.y * tileH);
        }
        img.src = this.level.tiles[index];
    }
}