import { allyPath } from "../utils/paths.js"

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
        name: "Warrior",
        imageSrc: allyPath("warrior")
    },
    RANGER: {
        name: "Ranger",
        imageSrc: allyPath("ranger")
    },
    MAGE: {
        name: "Mage",
        imageSrc: allyPath("mage")
    }
};