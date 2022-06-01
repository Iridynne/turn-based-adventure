import { allyPath } from "../../utils/paths.js"
import { ATTACKS } from "../attacks/attacks.js";

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
            ATTACKS.TACKLE,
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
            ATTACKS.QUICKSHOT
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
        health: 14,
        attacks: [
            ATTACKS.FIRE_BOLT,
            ATTACKS.FROSTBITE
        ]
    }
};

export const DEFAULT_ALLIES = [ALLIES.WARRIOR, ALLIES.ARCHER, ALLIES.MAGE];