// General
export const DEFAULT_FONT = "bold 20px Gameboy";
export const COLOR_1 = "#081820";
export const COLOR_2 = "#346856";
export const COLOR_3 = "#88c070";
export const COLOR_4 = "#e0f8d0";

// Tile
export const TILE_WIDTH = 64;
export const TILE_HEIGHT = 64;

// Map
export const MAP_WIDTH = Math.floor(innerWidth / TILE_WIDTH);
export const MAP_HEIGHT = Math.floor(innerHeight / TILE_HEIGHT);

// Tunnels
export const MIN_TUNNEL_LENGTH = 1;
export const MAX_TUNNEL_LENGTH = 10;

export const MIN_TUNNEL_COUNT = 10;
export const MAX_TUNNEL_COUNT = 30;

// Player
export const PLAYER_HEALTH = 100;
export const PLAYER_DAMAGE = 2;

// Enemies
export const MIN_ENEMY_COUNT = 3;
export const MAX_ENEMY_COUNT = 5;