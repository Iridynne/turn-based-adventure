import { backgroundPath, miscPath } from "../utils/paths.js"
import { MUSIC } from "./audio.js"
import { BOSSES } from "./characters/bosses.js";
import { ENEMIES } from "./characters/enemies.js"

// Number of encounters per stage (including Boss) - Only for Campaign
export const ENCOUNTER_COUNT = 7;
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
        bosses: [
            BOSSES.GOBLIN_CHIEF
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
            ENEMIES.MUMMY_WARRIOR,
            ENEMIES.MUMMY_ARCHER,
            ENEMIES.MUMMY_MAGE
        ],
        bosses: [
            BOSSES.ANUBIS
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
            ENEMIES.SKELETON_WARRIOR,
            ENEMIES.SKELETON_ARCHER,
            ENEMIES.NECROMANCER
        ],
        bosses: [
            BOSSES.LICH
        ],
        music: {
            battle: MUSIC.FOREST_BATTLE
        }
    }
}