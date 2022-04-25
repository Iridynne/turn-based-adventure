import { audioPath } from "../utils/paths";

export const AUDIO = {
    BATTLE_MUSIC: new Howl({
        src: audioPath("battle.wav"),
        html5: true
    })
};