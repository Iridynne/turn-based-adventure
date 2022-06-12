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
    // Physical
    SLASH: {
        name: "Slash",
        damage: 5,
        type: TYPE.PHYSICAL,
        isRanged: false,
        sound: {
            hit: SOUND.SWORD_HIT
        }
    },
    SLAM : {
        name: "Slam",
        damage: 3,
        type: TYPE.PHYSICAL,
        isRanged: false,
        sound: {
            hit: SOUND.MELEE_HIT
        }
    },
    BITE : {
        name: "Bite",
        damage: 4,
        type: TYPE.PHYSICAL,
        isRanged: false,
        sound: {
            hit: SOUND.MELEE_HIT
        }
    },
    SHIELD_BASH : {
        name: "Shield Bash",
        damage: 4,
        type: TYPE.PHYSICAL,
        isRanged: false,
        sound: {
            hit: SOUND.MELEE_HIT
        }
    },
    QUICKSHOT: {
        name: "Quickshot",
        damage: 4,
        type: TYPE.PHYSICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("arrow_right")
        },
        imageLeft: {
            src: projectilePath("arrow_left")
        },
        sound: {
            shoot: SOUND.ARROW_SHOOT,
            hit: SOUND.ARROW_HIT
        }
    },
    // Magic
    FLAMING_SHOT: {
        name: "Flaming Shot",
        damage: 5,
        type: TYPE.MAGICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("fire_arrow_right")
        },
        imageLeft: {
            src: projectilePath("fire_arrow_left")
        },
        sound: {
            shoot: SOUND.ARROW_SHOOT,
            hit: SOUND.FIRE_HIT
        }
    },
    FIREBALL: {
        name: "Fireball",
        damage: 5,
        type: TYPE.MAGICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("fire_ball_right")
        },
        imageLeft: {
            src: projectilePath("fire_ball_left")
        },
        sound: {
            shoot: SOUND.FIRE_SHOOT,
            hit: SOUND.FIRE_HIT
        }
    },
    ICE_DART: {
        name: "Ice Dart",
        damage: 4,
        type: TYPE.MAGICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("ice_shard_right")
        },
        imageLeft: {
            src: projectilePath("ice_shard_left")
        },
        sound: {
            shoot: SOUND.ICE_SHOOT,
            hit: SOUND.ICE_HIT
        }
    },
    LIGHTNING_BOLT: {
        name: "Lightning Bolt",
        damage: 4,
        type: TYPE.MAGICAL,
        isRanged: true,
        imageRight: {
            src: projectilePath("lightning_bolt_right")
        },
        imageLeft: {
            src: projectilePath("lightning_bolt_left")
        },
        sound: {
            shoot: SOUND.ICE_SHOOT,
            hit: SOUND.ICE_HIT
        }
    }
}