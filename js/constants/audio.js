import { audioPath } from "../utils/paths.js";

export const MUSIC = {
    FOREST_BATTLE: new Howl({
        src: audioPath("forest_battle.mp3"),
        html5: true,
        volume: 0.1,
        loop: true
    }),
    DESERT_BATTLE: new Howl({
        src: audioPath("desert_battle.mp3"),
        html5: true,
        volume: 0.1,
        loop: true
    })
};

export const SOUND = {
    MELEE_ATTACK: new Howl({
        src: audioPath("melee_attack.wav"),
        html5: true,
        volume: 0.1
    })
}