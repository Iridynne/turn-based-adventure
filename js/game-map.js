import * as constants from "./config/constants.js";
import * as utils from "./utils.js";
import { Tile } from "./tile.js";
import { Room } from "./room.js";

export class Map {
  constructor() {
    this.rooms = [];
    this.tiles = [];
    this.entities = [];
    this.height = constants.MAP_HEIGHT;
    this.width = constants.MAP_WIDTH;
  }

  draw(ctx) {
    var size = constants.ROOM_SIZE;
    var tileW = constants.TILE_WIDTH, tileH = constants.TILE_HEIGHT;
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        var pos = {
          x: j * size * tileW,
          y: i * size * tileH,
        };
        Tile.drawRoom(ctx, pos, this.tiles[i][j]);
      }
    }
  }

  generate() {
    this.#generateRooms();
    this.#generateMap();
    // this.#generateEnemies();
  }

  #generateEnemies() {
    var enemyCount = utils.getRandomInRange(
      constants.MIN_ENEMY_COUNT,
      constants.MAX_ENEMY_COUNT
    );
    this.entities = utils.createArray(-1, this.height, this.width);

    while (enemyCount) {
      var currentRow = Math.floor(Math.random() * this.height),
        currentColumn = Math.floor(Math.random() * this.width);

      if (
        this.rooms[currentRow][currentColumn] === 0 &&
        this.entities[currentRow][currentColumn] < 0
      ) {
        this.entities[currentRow][currentColumn] = Math.floor(
          Math.random() * constants.LEVELS[0].entities.length
        );
        enemyCount--;
      }
    }
  }

  #generateMap() {
    for (var i = 0; i < this.height; i++) {
      var row = [];
      for (var j = 0; j < this.width; j++) {
        var room = [];
        if (this.rooms[i][j] == 0) {
          var up = i > 0 && this.rooms[i - 1][j] == 0 ? 1 : 0;
          var down = i < this.height - 1 && this.rooms[i + 1][j] == 0 ? 1 : 0;
          var left = j > 0 && this.rooms[i][j - 1] == 0 ? 1 : 0;
          var right = j < this.width - 1 && this.rooms[i][j + 1] == 0 ? 1 : 0;

          room = Room.create(up, down, left, right);
        } else {
          room = Room.createEmpty();
        }

        row.push(room);
      }
      this.tiles.push(row);
    }
  }

  #generateRooms() {
    var minLength = constants.MIN_TUNNEL_LENGTH,
      maxLength = constants.MAX_TUNNEL_LENGTH;
    var minTunnels = constants.MIN_TUNNEL_COUNT,
      maxTunnels = constants.MAX_TUNNEL_COUNT;
    this.rooms = utils.createArray(1, this.height, this.width);

    var currentRow = Math.floor(Math.random() * this.height),
      currentColumn = Math.floor(Math.random() * this.width);

    var directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
    ];
    var lastDirection = [],
      randomDirection;

    var tunnelCount = utils.getRandomInRange(minTunnels, maxTunnels);

    while (tunnelCount) {
      // Pick a random valid direction
      do {
        randomDirection =
          directions[Math.floor(Math.random() * directions.length)];
      } while (
        (randomDirection[0] === -lastDirection[0] &&
          randomDirection[1] === -lastDirection[1]) ||
        (randomDirection[0] === lastDirection[0] &&
          randomDirection[1] === lastDirection[1])
      );

      // Create tunnel with random length
      var randomLength = utils.getRandomInRange(minLength, maxLength),
        tunnelLength = 0;

      while (tunnelLength < randomLength) {
        if (
          (currentRow === 0 && randomDirection[0] === -1) ||
          (currentColumn === 0 && randomDirection[1] === -1) ||
          (currentRow === this.height - 1 && randomDirection[0] === 1) ||
          (currentColumn === this.width - 1 && randomDirection[1] === 1)
        ) {
          break;
        } else {
          this.rooms[currentRow][currentColumn] = 0;
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
