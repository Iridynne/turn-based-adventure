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
            hold: 10
        },
        animate: true,
        name: "Goblin Chief",
        stats: {
            health: 40,
            defense: 3,
            magicDefense: 0
        },
        attacks: [
            ATTACKS.SHIELD_BASH,
            ATTACKS.SLASH
        ],
        minions: [
            ENEMIES.WOLF
        ]
    },
    // Desert Bosses
    ANUBIS: {
        image: {
            src: bossPath("anubis")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Anubis",
        stats: {
            health: 36,
            defense: 1,
            magicDefense: 2
        },
        attacks: [
            ATTACKS.WHIRLWIND,
            ATTACKS.FIREBALL
        ],
        minions: [
            ENEMIES.MUMMY,
            ENEMIES.MUMMY
        ]
    },
    // Cave Bosses
    LICH: {
        image: {
            src: bossPath("lich")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Lich",
        stats: {
            health: 36,
            defense: 0,
            magicDefense: 3
        },
        attacks: [
            ATTACKS.FIREBALL,
            ATTACKS.LIGHTNING_BOLT
        ],
        minions: [
            ENEMIES.SKELETON,
            ENEMIES.SKELETON
        ]
    },
}