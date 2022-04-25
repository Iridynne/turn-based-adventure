import { audioPath } from "../utils/paths.js";

export const MUSIC = {
    BATTLE: new Howl({
        src: audioPath("battle.wav"),
        html5: true,
        volume: 0.1,
        loop: true
    })
};

export const SOUND = {
    HIT: new Howl({
        src: audioPath(),
        html5: true,
        volume: 0.1
    })
}