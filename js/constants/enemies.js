import { ATTACKS } from "./attacks.js"
import { enemyPath } from "../utils/paths.js"

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
        attacks: [
            ATTACKS.BASH
        ]
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
        attacks: [
            ATTACKS.BASH
        ]
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
        attacks: [
            ATTACKS.BASH
        ]
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
        attacks: [
            ATTACKS.BASH
        ]
    }
}