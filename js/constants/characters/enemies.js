import { ATTACKS } from "../attacks.js"
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
    // Forest Enemies
    GOBLIN_WARRIOR: {
        image: {
            src: enemyPath("goblin_warrior")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Goblin Warrior",
        health: 20,
        attacks: [
            ATTACKS.TACKLE,
            ATTACKS.SLASH
        ],
        isEnemy: true
    },
    GOBLIN_ARCHER: {
        image: {
            src: enemyPath("goblin_archer")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Goblin Archer",
        health: 18,
        attacks: [
            ATTACKS.TACKLE,
            ATTACKS.QUICKSHOT
        ],
        isEnemy: true
    },
    GOBLIN_MAGE: {
        image: {
            src: enemyPath("goblin_mage")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Goblin Mage",
        health: 14,
        attacks: [
            ATTACKS.FIRE_BOLT,
            ATTACKS.ICE_SHARD
        ],
        isEnemy: true
    },
    // Desert Enemies
    MUMMY_WARRIOR: {
        image: {
            src: enemyPath("mummy_warrior")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Mummy Warrior",
        health: 20,
        attacks: [
            ATTACKS.TACKLE,
            ATTACKS.SLASH
        ],
        isEnemy: true
    },
    MUMMY_ARCHER: {
        image: {
            src: enemyPath("mummy_archer")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Mummy Archer",
        health: 18,
        attacks: [
            ATTACKS.TACKLE,
            ATTACKS.QUICKSHOT
        ],
        isEnemy: true
    },
    MUMMY_MAGE: {
        image: {
            src: enemyPath("mummy_mage")
        },
        frames: {
            max: 4,
            hold: 20
        },
        animate: true,
        name: "Mummy Mage",
        health: 14,
        attacks: [
            ATTACKS.FIRE_BOLT,
            ATTACKS.ICE_SHARD
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
            ATTACKS.TACKLE
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
            ATTACKS.TACKLE
        ],
        isEnemy: true
    },
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
            ATTACKS.FIRE_BOLT,
            ATTACKS.ICE_SHARD
        ],
        isEnemy: true
    },
}