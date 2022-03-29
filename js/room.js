import * as constants from "./config/constants.js";
import { createArray } from "./utils.js";

export class Room {
  static createEmpty() {
    var size = constants.ROOM_SIZE;
    var room = createArray(1, size, size);

    return room;
  }

  static create(up, down, left, right) {
    var size = constants.ROOM_SIZE;
    var room = createArray(0, size, size);

    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (
          (i == 0 && j == Math.floor(size / 2) && up == 1) ||
          (i == size - 1 && j == Math.floor(size / 2) && down == 1) ||
          (i == Math.floor(size / 2) && j == 0 && left == 1) ||
          (i == Math.floor(size / 2) && j == size - 1 && right == 1)
        ) {
          continue;
        }
        if (i === 0 || i === size - 1 || j === 0 || j === size - 1) {
          room[i][j] = 1;
        }
      }
    }

    return room;
  }
}
