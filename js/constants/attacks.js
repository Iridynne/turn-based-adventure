import { projectilePath } from "../utils/paths.js"
import { SOUND } from "./audio.js"

export const TYPE = {
    PHYSICAL: {
        name: "Physical",
        color: "#c7cfdd"
    },
    MAGICAL: {
        name: "Magical",
        color: "#94fdff"
    }
}

export const ATTACKS = {
    SLASH: {
        name: "Slash",
        damage: 5,
        type: TYPE.PHYSICAL,
        isRanged: false,
        sound: {
            hit: SOUND.SWORD_HIT
        }
    },
    BASH : {
        name: "Bash",
        damage: 4,
        type: TYPE.PHYSICAL,
        isRanged: false,
        sound: {
            hit: SOUND.MELEE_HIT
        }
    },
    QUICKSHOT: {
        name: "Quickshot",
        damage: 5,
        type: TYPE.PHYSICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("arrow_right")
        },
        imageLeft: {
            src: projectilePath("arrow_left")
        },
        sound: {
            fire: SOUND.ARROW_FIRE,
            hit: SOUND.ARROW_HIT
        }
    },
    FIRE_BOLT: {
        name: "Fire Bolt",
        damage: 6,
        type: TYPE.MAGICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("fire_bolt_right")
        },
        imageLeft: {
            src: projectilePath("fire_bolt_left")
        },
        sound: {
            fire: SOUND.ARROW_FIRE,
            hit: SOUND.ARROW_HIT
        }
    },
    ICE_SHARD: {
        name: "Ice Shard",
        damage: 4,
        type: TYPE.MAGICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("fire_bolt_right")
        },
        imageLeft: {
            src: projectilePath("fire_bolt_left")
        },
        sound: {
            fire: SOUND.ARROW_FIRE,
            hit: SOUND.ARROW_HIT
        }
    }
}