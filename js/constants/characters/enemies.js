import { ATTACKS } from "../attacks.js"
import { enemyPath } from "../../utils/paths.js"

export const ENEMY_POSITIONS = {
    FIRST: {
        position: {
            x: 568,
            y: 400
        },
        healthbarId: "enemy1",
        mirror: true
    },
    SECOND: {
        position: {
            x: 704,
            y: 400
        },
        healthbarId: "enemy2",
        mirror: true
    },
    THIRD: {
        position: {
            x: 840,
            y: 400
        },
        healthbarId: "enemy3",
        mirror: true
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
            hold: 10
        },
        animate: true,
        name: "Goblin Warrior",
        health: 20,
        attacks: [
            ATTACKS.SHIELD_BASH,
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
            hold: 10
        },
        animate: true,
        name: "Goblin Archer",
        health: 18,
        attacks: [
            ATTACKS.SLAM,
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
            hold: 10
        },
        animate: true,
        name: "Goblin Mage",
        health: 16,
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.FIREBALL
        ],
        isEnemy: true
    },
    WOLF: {
        image: {
            src: enemyPath("wolf")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Wolf",
        health: 16,
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.BITE
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
            hold: 10
        },
        animate: true,
        name: "Mummy Warrior",
        health: 20,
        attacks: [
            ATTACKS.SHIELD_BASH,
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
            hold: 10
        },
        animate: true,
        name: "Mummy Archer",
        health: 18,
        attacks: [
            ATTACKS.SLAM,
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
            hold: 10
        },
        animate: true,
        name: "Mummy Mage",
        health: 16,
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.FIREBALL
        ],
        isEnemy: true
    },
    MUMMY: {
        image: {
            src: enemyPath("mummy")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Mummy",
        health: 12,
        attacks: [
            ATTACKS.SLAM
        ],
        isEnemy: true
    },
    // Cave Enemies
    SKELETON_WARRIOR: {
        image: {
            src: enemyPath("skeleton_warrior")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Skeleton Warrior",
        health: 20,
        attacks: [
            ATTACKS.SHIELD_BASH,
            ATTACKS.SLASH
        ],
        isEnemy: true
    },
    SKELETON_ARCHER: {
        image: {
            src: enemyPath("skeleton_archer")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Skeleton Archer",
        health: 18,
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.QUICKSHOT
        ],
        isEnemy: true
    },
    NECROMANCER: {
        image: {
            src: enemyPath("necromancer")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Necromancer",
        health: 16,
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.ICE_DART
        ],
        isEnemy: true
    },
    SKELETON: {
        image: {
            src: enemyPath("skeleton")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Skeleton",
        health: 12,
        attacks: [
            ATTACKS.SLAM
        ],
        isEnemy: true
    },
}