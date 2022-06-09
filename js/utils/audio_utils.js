import { wait } from "./timer.js";

export function fadeIn(sound, duration = 500) {
    if(!sound) return;

    var volume = sound.volume();
    sound.volume(0);
    sound.play();
    wait(100).then(() => {
        sound.fade(0, volume, duration);
    });
}

export function fadeOut(sound, duration = 500) {
    if(!sound) return;

    var volume = sound.volume();
    sound.fade(volume, 0, duration);
    wait(duration).then(() => {
        sound.stop()
        sound.volume(volume);
    });
}