import { allyPath } from "../../utils/paths.js"
import { ATTACKS } from "../attacks.js";

export const ALLY_POSITIONS = {
    FIRST: {
        position: {
            x: 332,
            y: 400
        },
        healthbarId: "ally1"
    },
    SECOND: {
        position: {
            x: 196,
            y: 400
        },
        healthbarId: "ally2"
    },
    THIRD: {
        position: {
            x: 60,
            y: 400,
        },
        healthbarId: "ally3"
    }
}

export const ALLIES = {
    WARRIOR: {
        image: {
            src: allyPath("warrior")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Warrior",
        health: 20,
        attacks: [
            ATTACKS.SHIELD_BASH,
            ATTACKS.SLASH
        ]
    },
    ARCHER: {
        image: {
            src: allyPath("archer")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Archer",
        health: 18,
        attacks: [
            ATTACKS.QUICKSHOT,
            ATTACKS.FLAMING_SHOT
        ]
    },
    MAGE: {
        image: {
            src: allyPath("mage")
        },
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        name: "Mage",
        health: 16,
        attacks: [
            ATTACKS.ICE_DART,
            ATTACKS.FIREBALL
        ]
    }
};

export const DEFAULT_ALLIES = [ALLIES.WARRIOR, ALLIES.ARCHER, ALLIES.MAGE];