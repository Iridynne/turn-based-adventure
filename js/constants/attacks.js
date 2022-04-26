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