import { Effects } from "./effects.js"; // Effects importieren
import { ExplosionShapes } from "./shapes.js"; // ExplosionShapes importieren

export class RocketPreview {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: { x: number; y: number; vx: number; vy: number; color: string; alpha: number; size: number }[] = [];
    private size: number = 3;
    private explosionRadius: number = 50;
    private particlesCount: number = 100;
    private color1: string = "#ff0000";
    private color2: string = "#ffff00";
    private shape: string = "circle";
    private rocketName: string = "";
    private effects: Effects;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
        this.effects = new Effects();
    }

    // Methode für die Explosion bei Klicks
    explodeAt(x: number, y: number, name: string, size: number, color1: string, color2: string, particles: number, secondaryParticles: number, radius: number, shape: string) {
        this.rocketName = name;
        this.size = size;
        this.color1 = color1;
        this.color2 = color2;
        this.particlesCount = particles;
        this.shape = shape;

        if (this.shape === "heart") {
            this.explosionRadius = this.getRandomInRange(0.001, 20);
        } else if (this.shape === "star") {
            this.explosionRadius = this.getRandomInRange(50, 200);
        } else {
            this.explosionRadius = radius;
        }

        this.startAnimation(x, y, secondaryParticles); // Starte die Animation an der geklickten Position
    }

    // Aktualisiere die Vorschau
    updatePreview(name: string, size: number, color1: string, color2: string, particles: number, secondaryParticles: number, radius: number, shape: string) {
        this.rocketName = name;
        this.size = size;
        this.color1 = color1;
        this.color2 = color2;
        this.particlesCount = particles;
        this.shape = shape;

        if (this.shape === "heart") {
            this.explosionRadius = this.getRandomInRange(0.001, 20);
        } else if (this.shape === "star") {
            this.explosionRadius = this.getRandomInRange(50, 200);
        } else {
            this.explosionRadius = radius;
        }

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        this.startAnimation(centerX, centerY, secondaryParticles); // Starte die Animation in der Mitte
    }

    private getRandomInRange(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    // Starte die Animation an einer bestimmten Position
    private startAnimation(x: number, y: number, secondaryParticles: number) {
        this.particles = [];
        let particlePositions: { x: number, y: number }[];

        if (this.shape === "heart") {
            particlePositions = ExplosionShapes.generateParticles("heart", x, y, this.explosionRadius);
        } else {
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
    private animate() {
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
        
        if (this.particles.length > 0 ) {
            requestAnimationFrame(() => this.animate());
        }
    }

}