import { allyPath } from "../../utils/paths.js"
import { ATTACKS } from "../attacks.js";

export const ALLY_POSITIONS = {
    FIRST: {
        x: 332,
        y: 400
    },
    SECOND: {
        x: 196,
        y: 400
    },
    THIRD: {
        x: 60,
        y: 400
    }
}

export const ALLIES = {
    WARRIOR: {
        image: {
            src: allyPath("warrior")
        },
        frames: {
            max: 4,
            hold: 20
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
            hold: 20
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
            hold: 20
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