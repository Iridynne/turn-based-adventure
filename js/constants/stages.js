import { backgroundPath, miscPath } from "../utils/paths.js"
import { MUSIC } from "./audio.js"
import { ENEMIES } from "./characters/enemies.js"

// Number of encounters per stage (including Boss) - Only for Campaign
export const ENCOUNTER_COUNT = 1;
// Number of stages
export const STAGE_COUNT = 3;

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
    FOREST: {
        name: "Forest",
        image: {
            src: backgroundPath("forest")
        },
        enemies: [
            ENEMIES.GOBLIN_WARRIOR,
            ENEMIES.GOBLIN_ARCHER,
            ENEMIES.GOBLIN_MAGE
        ],
        music: {
            battle: MUSIC.FOREST_BATTLE
        }
    },
    DESERT: {
        name: "Desert",
        image: {
            src: backgroundPath("desert")
        },
        enemies: [
            ENEMIES.SKELETON
        ],
        music: {
            battle: MUSIC.DESERT_BATTLE
        }
    },
    CAVE: {
        name: "Cave",
        image: {
            src: backgroundPath("cave")
        },
        enemies: [
            ENEMIES.SKELETON,
            ENEMIES.SLIME
        ],
        music: {
            battle: MUSIC.FOREST_BATTLE
        }
    }
}