import { Particle } from './particle';
export class Rocket {
    constructor(x, y, radius, color, particleCount = 100 // Standardanzahl der Partikel
    ) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.particleCount = particleCount;
        this.particles = [];
        this.explode();
    }
    explode() {
        for (let i = 0; i < this.particleCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * this.radius; // Startposition im Radius
            const speed = Math.random() * 3 + 1;
            const vx = Math.cos(angle) * speed;
            const vy = Math.sin(angle) * speed;
            const x = this.x + Math.cos(angle) * distance;
            const y = this.y + Math.sin(angle) * distance;
            const lifetime = Math.random() * 100 + 50; // Lebensdauer
            this.particles.push(new Particle(x, y, vx, vy, this.color, lifetime));
        }
    }
    draw(ctx) {
        this.particles = this.particles.filter(particle => particle.lifetime > 0); // Entferne abgelaufene Partikel
        this.particles.forEach(particle => {
            particle.draw(ctx);
            particle.update();
        });
    }
    isExploded() {
        return this.particles.length === 0; // Rakete hat keine Partikel mehr
    }
}
