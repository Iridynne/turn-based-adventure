import { audioPath } from "../utils/paths.js";

export const AUDIO_VOLUME = 0.1;

export const MUSIC = {
    FOREST_BATTLE: new Howl({
        src: audioPath("forest_battle.mp3"),
        html5: true,
        volume: AUDIO_VOLUME,
        loop: true
    }),
    DESERT_BATTLE: new Howl({
        src: audioPath("desert_battle.mp3"),
        html5: true,
        volume: AUDIO_VOLUME,
        loop: true
    })
};

export const SOUND = {
    MELEE_HIT: new Howl({
        src: audioPath("melee_hit.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    }),
    SWORD_HIT: new Howl({
        src: audioPath("sword_hit.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    }),
    ARROW_HIT: new Howl({
        src: audioPath("arrow_hit.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    }),
    ARROW_FIRE: new Howl({
        src: audioPath("arrow_fire.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    }),
    FIRE_SPELL_FIRE: new Howl({
        src: audioPath("fire_spell_fire.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    }),
    FIRE_SPELL_HIT: new Howl({
        src: audioPath("fire_spell_hit.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    }),
    ICE_SPELL_FIRE: new Howl({
        src: audioPath("ice_spell_fire.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    }),
    ICE_SPELL_HIT: new Howl({
        src: audioPath("ice_spell_hit.wav"),
        html5: true,
        volume: AUDIO_VOLUME
    })
}