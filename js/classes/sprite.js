// Canvas
const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

export class Sprite {
    constructor({
        position = { x: 0, y: 0 },
        image = { src: '' },
        frames = { max: 1, hold: 10 },
        animate = false,
        mirror = false,
    }) {
        this.position = position;
        this.image = new Image();
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        };
        this.image.src = image.src;
        this.animate = animate;
        this.mirror = mirror;

        this.opacity = 1;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;

        var offsetX = this.mirror ? this.width : 0;
        var scaleX = this.mirror ? -1 : 1;

        ctx.scale(scaleX, 1);
        ctx.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            -offsetX + scaleX * this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height,
        );
        ctx.restore();

        if (!this.animate) return;

        if (this.frames.max > 1) this.frames.elapsed++;

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}
