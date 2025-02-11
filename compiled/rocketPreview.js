import { Effects } from "./effects.js"; // Effects importieren
import { ExplosionShapes } from "./shapes.js"; // ExplosionShapes importieren
export class RocketPreview {
    constructor(canvasId) {
        this.particles = [];
        this.size = 3;
        this.explosionRadius = 50;
        this.particlesCount = 100;
        this.color1 = "#ff0000";
        this.color2 = "#ffff00";
        this.shape = "circle";
        this.rocketName = "";
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.effects = new Effects();
    }
    // Methode für die Explosion bei Klicks
    explodeAt(x, y, name, size, color1, color2, particles, secondaryParticles, radius, shape) {
        this.rocketName = name;
        this.size = size;
        this.color1 = color1;
        this.color2 = color2;
        this.particlesCount = particles;
        this.shape = shape;
        if (this.shape === "heart") {
            this.explosionRadius = this.getRandomInRange(0.001, 20);
        }
        else if (this.shape === "star") {
            this.explosionRadius = this.getRandomInRange(50, 200);
        }
        else {
            this.explosionRadius = radius;
        }
        this.startAnimation(x, y, secondaryParticles); // Starte die Animation an der geklickten Position
    }
    // Aktualisiere die Vorschau
    updatePreview(name, size, color1, color2, particles, secondaryParticles, radius, shape) {
        this.rocketName = name;
        this.size = size;
        this.color1 = color1;
        this.color2 = color2;
        this.particlesCount = particles;
        this.shape = shape;
        if (this.shape === "heart") {
            this.explosionRadius = this.getRandomInRange(0.001, 20);
        }
        else if (this.shape === "star") {
            this.explosionRadius = this.getRandomInRange(50, 200);
        }
        else {
            this.explosionRadius = radius;
        }
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        this.startAnimation(centerX, centerY, secondaryParticles); // Starte die Animation in der Mitte
    }
    getRandomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    // Starte die Animation an einer bestimmten Position
    startAnimation(x, y, secondaryParticles) {
        this.particles = [];
        let particlePositions;
        if (this.shape === "heart") {
            particlePositions = ExplosionShapes.generateParticles("heart", x, y, this.explosionRadius);
        }
        else {
            particlePositions = ExplosionShapes.generateParticles(this.shape, x, y, this.explosionRadius);
        }
        for (let i = 0; i < this.particlesCount; i++) {
            const pos = particlePositions[i % particlePositions.length];
            const angle = Math.random() * 2 * Math.PI;
            const speed = Math.random() * 3 + 1;
            this.particles.push({
                x: pos.x,
                y: pos.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: Math.random() > 0.5 ? this.color1 : this.color2,
                alpha: 1,
                size: this.size
            });
        }
        this.animate();
    }
    // Animationsschleife
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.98;
            p.vy *= 0.98;
            p.alpha -= 0.01;
            return p.alpha > 0;
        });
        this.effects.drawParticles(this.ctx, this.particles);
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
    }
}
