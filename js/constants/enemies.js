import { ATTACKS } from "./attacks.js"
import { enemyPath } from "../utils/paths.js"

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
        stats: {
            health: 20,
            defense: 2,
            magicDefense: 0
        },
        attacks: [
            ATTACKS.SHIELD_BASH,
            ATTACKS.SLASH
        ]
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
        stats: {
            health: 18,
            defense: 1,
            magicDefense: 1
        },
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.QUICKSHOT
        ]
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
        stats: {
            health: 16,
            defense: 0,
            magicDefense: 2
        },
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.FIREBALL
        ]
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
        stats: {
            health: 16,
            defense: 1,
            magicDefense: 1
        },
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.BITE
        ]
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
        stats: {
            health: 20,
            defense: 2,
            magicDefense: 0
        },
        attacks: [
            ATTACKS.SHIELD_BASH,
            ATTACKS.SLASH
        ]
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
        stats: {
            health: 18,
            defense: 1,
            magicDefense: 1
        },
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.QUICKSHOT
        ]
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
        stats: {
            health: 16,
            defense: 0,
            magicDefense: 2
        },
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.WHIRLWIND
        ]
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
        stats: {
            health: 12,
            defense: 1,
            magicDefense: 0
        },
        attacks: [
            ATTACKS.SLAM
        ]
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
        stats: {
            health: 20,
            defense: 2,
            magicDefense: 0
        },
        attacks: [
            ATTACKS.SHIELD_BASH,
            ATTACKS.SLASH
        ]
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
        stats: {
            health: 18,
            defense: 1,
            magicDefense: 1
        },
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.QUICKSHOT
        ]
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
        stats: {
            health: 16,
            defense: 0,
            magicDefense: 2
        },
        attacks: [
            ATTACKS.SLAM,
            ATTACKS.ICE_DART
        ]
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
        stats: {
            health: 12,
            defense: 1,
            magicDefense: 0
        },
        attacks: [
            ATTACKS.SLAM
        ]
    },
}