import * as constants from "./config/constants.js"

const tilesPath = "../img/tiles/";

export class Tile {
    static #values = [
        {
            name: "Grass", url: tilesPath + "grass.png"
        },
        {
            name: "Wall", url: tilesPath + "wall.png"
        }
    ];

    static draw(ctx, pos, index) {
        var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;

        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, pos.x * tileW, pos.y * tileH);
        }
        img.src = this.#values[index].url;
    }
}