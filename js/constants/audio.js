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
    ARROW_HIT: new Howl({
        src: audioPath("arrow_hit.wav"),
        html5: true,
        volume: 0.1
    }),
    BOW_FIRE: new Howl({
        src: audioPath("bow_fire.wav"),
        html5: true,
        volume: 0.1
    }),
    MELEE_HIT: new Howl({
        src: audioPath("melee_hit.wav"),
        html5: true,
        volume: 0.1
    })
}