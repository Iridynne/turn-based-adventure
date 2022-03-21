import * as constants from "./config/constants.js"

export class Player {
    health = constants.PLAYER_HEALTH;
    damage = constants.PLAYER_ATTACK_DAMAGE;

    constructor(context) {
        this.context = context;
    }

    moveTo(x, y) {
        
    }
}