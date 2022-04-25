// Image Paths
export function allyPath(name) {
    name = name.toLowerCase();
    return `../../img/entities/allies/${name}.png`;
}

export function enemyPath(name) {
    name = name.toLowerCase();
    return `../../img/entities/enemies/${name}.png`;
}

export function backgroundPath(name) {
    name = name.toLowerCase();
    return `../../img/backgrounds/${name}.png`;
}

// Audio Path
export function audioPath(name) {
    name = name.toLowerCase();
    return `../../audio/${name}`;
}