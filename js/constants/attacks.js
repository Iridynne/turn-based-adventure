export const TYPE = {
    PHYSICAL: "Physical",
    MAGICAL: "Magical"
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
        type: TYPE.MAGICAL
    },
    FROSTBITE: {
        name: "Frostbite",
        damage: 4,
        type: TYPE.MAGICAL
    }
}