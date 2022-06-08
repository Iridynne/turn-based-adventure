import { bossPath } from "../../utils/paths.js";
import { ATTACKS } from "../attacks.js";
import { ENEMIES } from "./enemies.js";

export const BOSSES = {
    // Forest Bosses
    GOBLIN_CHIEF: {
        image: {
            src: bossPath("goblin_chief")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Goblin Chief",
        health: 40,
        attacks: [
            ATTACKS.TACKLE,
            ATTACKS.SLASH
        ],
        minions: [
            ENEMIES.WOLF
        ],
        isEnemy: true
    },
    // Desert Bosses
    ANUBIS: {
        image: {
            src: bossPath("anubis")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Anubis",
        health: 34,
        attacks: [
            ATTACKS.TACKLE,
            ATTACKS.FIRE_BOLT
        ],
        minions: [
            ENEMIES.MUMMY,
            ENEMIES.MUMMY
        ],
        isEnemy: true
    }
    // Cave Bosses
}