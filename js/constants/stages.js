import { backgroundPath, miscPath } from "../utils/paths.js"
import { ENEMIES } from "./characters/enemies.js"

export const CAMPFIRE = {
    position: {
        x: 448,
        y: 400
    },
    image: {
        src: miscPath("campfire")
    },
    frames: {
        max: 4,
        hold: 20
    },
    animate: true
}

export const STAGES = {
    CAVE: {
        name: "Cave",
        image: {
            src: backgroundPath("cave")
        },
        enemies: [
            ENEMIES.SKELETON
        ]
    },
    DESERT: {
        name: "Desert",
        image: {
            src: backgroundPath("desert")
        },
        enemies: [
            ENEMIES.SKELETON
        ]
    },
    FOREST: {
        name: "Forest",
        image: {
            src: backgroundPath("forest")
        },
        enemies: [
            ENEMIES.SLIME,
            ENEMIES.GOBLIN
        ]
    }
}