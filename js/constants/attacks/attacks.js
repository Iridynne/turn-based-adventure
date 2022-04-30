import { projectilePath } from "../../utils/paths.js"
import { SOUND } from "../audio.js"

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
            hit: SOUND.MELEE_HIT
        }
    },
    TACKLE : {
        name: "Tackle",
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
        image: {
            src: projectilePath("arrow")
        },
        sound: {
            fire: SOUND.BOW_FIRE,
            hit: SOUND.ARROW_HIT
        }
    },
    FIRE_BOLT: {
        name: "Fire Bolt",
        damage: 6,
        type: TYPE.MAGICAL,
        isRanged: true,
        image: {
            src: projectilePath("fire_bolt")
        },
        sound: {
            fire: SOUND.BOW_FIRE,
            hit: SOUND.ARROW_HIT
        }
    },
    FROSTBITE: {
        name: "Frostbite",
        damage: 4,
        type: TYPE.MAGICAL,
        isRanged: true,
        image: {
            src: projectilePath("fire_bolt")
        },
        sound: {
            fire: SOUND.BOW_FIRE,
            hit: SOUND.ARROW_HIT
        }
    }
}