import { projectilePath } from "../utils/paths.js"
import { SOUND } from "./audio.js"

export const TYPE = {
    PHYSICAL: {
        name: "Physical",
        color: "#92a1b9"
    },
    MAGICAL: {
        name: "Magical",
        color: "#00cdf9"
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
        image: {
            src: projectilePath("arrow")
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
        image: {
            src: projectilePath("fire_arrow")
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
        image: {
            src: projectilePath("fire_ball")
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
        image: {
            src: projectilePath("ice_shard")
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
        image: {
            src: projectilePath("lightning_bolt")
        },
        sound: {
            shoot: SOUND.LIGHTNING_SHOOT,
            hit: SOUND.LIGHTNING_HIT
        }
    },
    WHIRLWIND: {
        name: "Whirlwind",
        damage: 5,
        type: TYPE.MAGICAL,
        isRanged: true,
        image: {
            src: projectilePath("whirlwind")
        },
        sound: {
            shoot: SOUND.LIGHTNING_SHOOT,
            hit: SOUND.LIGHTNING_HIT
        }
    }
}