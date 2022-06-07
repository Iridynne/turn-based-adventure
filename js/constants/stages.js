import { backgroundPath, miscPath } from "../utils/paths.js"
import { MUSIC } from "./audio.js"
import { ENEMIES } from "./characters/enemies.js"

// Number of encounters per stage (including Boss) - Only for Campaign
export const ENCOUNTER_COUNT = 5;
// Number of stages
export const STAGE_COUNT = 3;

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