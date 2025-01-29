export class Particle {
    constructor(x, y, vx, vy, color, lifetime, radius // Optionaler Radius
    ) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.lifetime = lifetime;
        this.radius = 2; // Standardradius
        this.ax = 0; // Beschleunigung x
        this.ay = 0.1; // Beschleunigung y (z. B. Schwerkraft)
        if (radius !== undefined)
            this.radius = radius;
    }
    draw(ctx) {
        ctx.globalAlpha = this.lifetime > 0 ? this.lifetime / 100 : 0; // Verblassen
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1; // Zurücksetzen
    }
    update() {
        if (this.lifetime > 0) {
            this.vx += this.ax;
            this.vy += this.ay;
            this.x += this.vx;
            this.y += this.vy;
            this.lifetime -= 1;
        }
    }
}
