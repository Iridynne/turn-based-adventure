import { ATTACKS } from "./attacks.js"
import { enemyPath } from "../utils/image_paths.js"

export const ENEMIES = {
    SKELETON: {
        position: {
            x: 0,
            y: 0,
        },
        imageSrc: enemyPath("skeleton"),
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
        imageSrc: enemyPath("slime"),
        animate: true,
        name: "Slime",
        attacks: [
            ATTACKS.BASH
        ]
    }
}