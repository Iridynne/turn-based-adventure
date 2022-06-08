import { bossPath } from "../../utils/paths.js";
import { ATTACKS } from "../attacks.js";
import { ENEMIES } from "./enemies.js";

export const BOSSES = {
    // Forest Bosses

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
        health: 30,
        attacks: [
            ATTACKS.TACKLE,
            ATTACKS.FIRE_BOLT
        ],
        minions: [
            ENEMIES.MUMMY_WARRIOR,
            ENEMIES.MUMMY_WARRIOR
        ],
        isEnemy: true
    }
}