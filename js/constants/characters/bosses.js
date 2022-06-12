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
            ATTACKS.SHIELD_BASH,
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
        health: 36,
        attacks: [
            ATTACKS.SHIELD_BASH,
            ATTACKS.FIREBALL
        ],
        minions: [
            ENEMIES.MUMMY,
            ENEMIES.MUMMY
        ],
        isEnemy: true
    },
    // Cave Bosses
    LICH: {
        image: {
            src: bossPath("lich")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Lich",
        health: 36,
        attacks: [
            ATTACKS.FIREBALL,
            ATTACKS.ICE_DART
        ],
        minions: [
            ENEMIES.SKELETON,
            ENEMIES.SKELETON
        ],
        isEnemy: true
    },
}