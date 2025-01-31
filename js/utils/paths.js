// Image Paths
export function allyPath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/img/characters/allies/${name}.png`;
}

export function enemyPath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/img/characters/enemies/${name}.png`;
}

export function bossPath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/img/characters/bosses/${name}.png`;
}

export function backgroundPath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/img/backgrounds/${name}.png`;
}

export function miscPath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/img/misc/${name}.png`;
}

export function projectilePath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/img/projectiles/${name}.png`;
}

// Audio Paths
export function soundPath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/audio/sounds/${name}`;
}

export function musicPath(name) {
    name = name.toLowerCase();
    return `${window.location.origin}/audio/music/${name}`;
}
