import { soundPath, musicPath } from "../utils/paths.js";

export const MUSIC_VOLUME = 0.05;
export const SOUND_VOLUME = 0.1;

export const MUSIC = {
    MAIN_MENU: new Howl({
        src: musicPath("main_menu.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
    REST_SPOT: new Howl({
        src: musicPath("rest_spot.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
    FOREST_BATTLE: new Howl({
        src: musicPath("forest_battle.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
    DESERT_BATTLE: new Howl({
        src: musicPath("desert_battle.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
    CAVE_BATTLE: new Howl({
        src: musicPath("cave_battle.wav"),
        html5: true,
        volume: MUSIC_VOLUME,
        loop: true
    }),
};

export const SOUND = {
    // Physical
    MELEE_HIT: new Howl({
        src: soundPath("melee_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    SWORD_HIT: new Howl({
        src: soundPath("sword_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ARROW_HIT: new Howl({
        src: soundPath("arrow_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ARROW_SHOOT: new Howl({
        src: soundPath("arrow_shoot.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    // Magical
    FIRE_SHOOT: new Howl({
        src: soundPath("fire_shoot.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    FIRE_HIT: new Howl({
        src: soundPath("fire_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ICE_SHOOT: new Howl({
        src: soundPath("ice_shoot.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    ICE_HIT: new Howl({
        src: soundPath("ice_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    LIGHTNING_SHOOT: new Howl({
        src: soundPath("lightning_shoot.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    LIGHTNING_HIT: new Howl({
        src: soundPath("lightning_hit.wav"),
        html5: true,
        volume: SOUND_VOLUME
    }),
    // Other
    HEAL: new Howl({
        src: soundPath("heal.wav"),
        html5: true,
        volume: SOUND_VOLUME
    })
}