import { audioPath } from "../utils/paths.js";

export const MUSIC_VOLUME = 0.05;
export const SOUND_VOLUME = 0.15;

export const MUSIC = {
    MAIN_MENU: new Howl({
        src: audioPath("main_menu.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
    REST_SPOT: new Howl({
        src: audioPath("rest_spot.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
    FOREST_BATTLE: new Howl({
        src: audioPath("main_menu.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
    DESERT_BATTLE: new Howl({
        src: audioPath("main_menu.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    })
};

export const SOUND = {
    MELEE_HIT: new Howl({
        src: audioPath("melee_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    SWORD_HIT: new Howl({
        src: audioPath("sword_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ARROW_HIT: new Howl({
        src: audioPath("arrow_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ARROW_FIRE: new Howl({
        src: audioPath("arrow_fire.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    FIRE_SPELL_FIRE: new Howl({
        src: audioPath("fire_spell_fire.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    FIRE_SPELL_HIT: new Howl({
        src: audioPath("fire_spell_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ICE_SPELL_FIRE: new Howl({
        src: audioPath("ice_spell_fire.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ICE_SPELL_HIT: new Howl({
        src: audioPath("ice_spell_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    })
}