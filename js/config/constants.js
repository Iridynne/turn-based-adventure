// GENERAL
export const DEFAULT_FONT = "bold 20px Gameboy";
export const COLOR_1 = "#081820";
export const COLOR_2 = "#346856";
export const COLOR_3 = "#88c070";
export const COLOR_4 = "#e0f8d0";

// TILE
export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 64;

// MAP
export const MAP_WIDTH = Math.floor(innerWidth / TILE_WIDTH);
export const MAP_HEIGHT = Math.floor(innerHeight / TILE_HEIGHT);

// TUNNELS
export const MIN_TUNNEL_LENGTH = 1;
export const MAX_TUNNEL_LENGTH = 10;

export const MIN_TUNNEL_COUNT = 10;
export const MAX_TUNNEL_COUNT = 50;

// PLAYER
export const PLAYER_HEALTH = 3;
export const PLAYER_ATTACK_DAMAGE = 1;

// ENTITIES
export const MIN_ENEMY_COUNT = 3;
export const MAX_ENEMY_COUNT = 10;

// LEVELS
const tilePath = "../../img/tiles/";
const entityPath = "../../img/entities/";

export const LEVELS = [
    {
        name: "Forest",
        end: 2,
        tiles: [
            tilePath + "grass.png",
            tilePath + "tree.png",
            tilePath + "cave"
        ],
        entities: [
            entityPath + "slime.png",
            entityPath + "skeleton.png"
        ]
    }
]