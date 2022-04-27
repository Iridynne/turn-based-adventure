import { ATTACKS } from "../attacks/attacks.js"
import { enemyPath } from "../../utils/paths.js"

export const ENEMY_POSITIONS = {
    FIRST: {
        x: 568,
        y: 400
    },
    SECOND: {
        x: 704,
        y: 400
    },
    THIRD: {
        x: 840,
        y: 400
    }
}

export const ENEMIES = {
    EVIL_MAGE: {
        image: {
            src: enemyPath("evil_mage")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Evil Mage",
        health: 20,
        attacks: [
            ATTACKS.BASH,
            ATTACKS.SLASH,
            ATTACKS.FIRE_BOLT,
            ATTACKS.FROSTBITE
        ],
        isEnemy: true
    },
    GOBLIN: {
        image: {
            src: enemyPath("goblin")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Goblin",
        health: 15,
        attacks: [
            ATTACKS.BASH
        ],
        isEnemy: true
    },
    SKELETON: {
        image: {
            src: enemyPath("skeleton")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Skeleton",
        health: 20,
        attacks: [
            ATTACKS.BASH
        ],
        isEnemy: true
    },
    SLIME: {
        image: {
            src: enemyPath("slime")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Slime",
        health: 20,
        attacks: [
            ATTACKS.BASH
        ],
        isEnemy: true
    }
}