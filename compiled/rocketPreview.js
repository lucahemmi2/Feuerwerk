export class RocketPreview {
    constructor(canvasId) {
        this.particles = [];
        this.size = 50;
        this.color1 = "#ff0000";
        this.color2 = "#ffff00";
        this.particlesCount = 100;
        this.animationRunning = false;
        this.secondaryParticlesCount = 4;
        this.explosionRadius = 50; // Standardwert für den Radius
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
    }
    updatePreview(size, color1, color2, particles, secondaryParticles, radius) {
        this.size = size;
        this.color1 = color1;
        this.color2 = color2;
        this.particlesCount = particles;
        this.secondaryParticlesCount = secondaryParticles;
        this.explosionRadius = radius; // Speichert den Radius-Wert
        this.startAnimation(); // Starte eine Explosion neu
    }
    startAnimation() {
        this.particles = []; // Reset Partikel-Array
        for (let i = 0; i < this.particlesCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 2 + 1) * (this.explosionRadius / 50); // Geschwindigkeit basiert auf Radius
            this.particles.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: Math.random() > 0.5 ? this.color1 : this.color2,
                alpha: 1,
                isSecondary: false
            });
        }
        if (!this.animationRunning) {
            this.animationRunning = true;
            this.animate();
        }
    }
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.alpha -= 0.025;
            if (particle.alpha <= 0) {
                if (!particle.isSecondary) {
                    this.generateSecondaryParticles(particle.x, particle.y);
                }
                this.particles.splice(index, 1);
            }
        });
        this.drawParticles();
        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
        else {
            this.animationRunning = false;
        }
    }
    generateSecondaryParticles(x, y) {
        for (let i = 0; i < this.secondaryParticlesCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = (Math.random() * 2 + 1) * (this.explosionRadius / 50); // Geschwindigkeit basiert auf Radius
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: Math.random() > 0.5 ? this.color1 : this.color2,
                alpha: 1,
                isSecondary: true
            });
        }
    }
    drawParticles() {
        this.particles.forEach((particle) => {
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, this.size / 10, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;
    }
}
