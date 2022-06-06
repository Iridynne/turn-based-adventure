export class Healthbar {
    constructor(id) {
        this.container = document.querySelector(`#${id}-container`);
        this.healthbar = document.querySelector(`#${id}-healthbar`);
        this.health = document.querySelector(`#${id}-health`);
    }
}