import { projectilePath } from "../../utils/paths.js"

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
        damage: 3,
        type: TYPE.PHYSICAL
    },
    BASH : {
        name: "Bash",
        damage: 5,
        type: TYPE.PHYSICAL
    },
    FIRE_BOLT: {
        name: "Fire Bolt",
        damage: 6,
        type: TYPE.MAGICAL,
        image: {
            src: projectilePath("fire_bolt")
        }
    },
    FROSTBITE: {
        name: "Frostbite",
        damage: 4,
        type: TYPE.MAGICAL,
        image: {
            src: projectilePath("fire_bolt")
        }
    }
}