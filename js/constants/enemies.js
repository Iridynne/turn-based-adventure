import * as general from "./general.js"
import { ATTACKS } from "./attacks.js"

export const ENEMIES = {
    SKELETON: {
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: general.ENTITY_PATH + "skeleton.png",
        animate: true,
        name: "Skeleton",
        attacks: [
            ATTACKS.BASH
        ]
    },
    SLIME: {
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: general.ENTITY_PATH + "slime.png",
        animate: true,
        name: "Slime",
        attacks: [
            ATTACKS.BASH
        ]
    }
}