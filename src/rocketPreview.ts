export class ExplosionShapes {
    static generateParticles(shape: string, centerX: number, centerY: number, explosionRadius: number): { x: number; y: number }[] {
        console.log(`🔹 Generiere Partikel für Form: ${shape}`);
        let particles: { x: number; y: number }[] = [];

        switch (shape) {
            case "circle":
                particles = this.generateCircle(centerX, centerY, explosionRadius);
                break;
            case "heart":
                particles = this.generateHeart(centerX, centerY, explosionRadius);
                break;
            case "star":
                particles = this.generateStar(centerX, centerY, explosionRadius);
                break;
            default:
                console.warn("⚠️ Unbekannte Form! Standard: Kreis");
                particles = this.generateCircle(centerX, centerY, explosionRadius);
        }

        console.log(`✅ ${particles.length} Partikel generiert`);
        return particles;
    }

    private static generateCircle(centerX: number, centerY: number, radius: number): { x: number; y: number }[] {
        let particles: { x: number; y: number }[] = [];
        for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 2;
            particles.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }
        return particles;
    }

    private static generateHeart(centerX: number, centerY: number, radius: number): { x: number; y: number }[] {
        let particles: { x: number; y: number }[] = [];
        for (let t = 0; t < Math.PI * 2; t += 0.1) {
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            particles.push({
                x: centerX + (x * radius) / 16,
                y: centerY - (y * radius) / 16
            });
        }
        return particles;
    }

    private static generateStar(centerX: number, centerY: number, radius: number): { x: number; y: number }[] {
        let particles: { x: number; y: number }[] = [];
        const spikes = 5;
        for (let i = 0; i < spikes * 2; i++) {
            const angle = (i / (spikes * 2)) * Math.PI * 2;
            const r = i % 2 === 0 ? radius : radius / 2;
            particles.push({
                x: centerX + Math.cos(angle) * r,
                y: centerY + Math.sin(angle) * r
            });
        }
        return particles;
    }
}

export class RocketPreview {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private particles: { x: number; y: number; vx: number; vy: number; color: string; alpha: number }[] = [];
    private size: number = 3;
    private explosionRadius: number = 50;
    private particlesCount: number = 100;
    private color1: string = "#ff0000";
    private color2: string = "#ffff00";
    private shape: string = "circle";

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.ctx = this.canvas.getContext("2d")!;
    }

    updatePreview(size: number, color1: string, color2: string, particles: number, secondaryParticles: number, radius: number, shape: string) {
        console.log(`🔄 Aktualisiere Vorschau: Größe=${size}, Farbe1=${color1}, Farbe2=${color2}, Partikel=${particles}, Radius=${radius}, Form=${shape}`);

        this.size = size;
        this.color1 = color1;
        this.color2 = color2;
        this.particlesCount = particles;
        this.explosionRadius = radius;
        this.shape = shape;

        this.startAnimation();
    }

    private startAnimation() {
        this.particles = [];
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        console.log(`📌 Generiere Form: ${this.shape} mit Radius ${this.explosionRadius}`);

        // Hole die Partikelpositionen
        const particlePositions = ExplosionShapes.generateParticles(this.shape, centerX, centerY, this.explosionRadius);

        // Falls keine Partikel generiert wurden, abbrechen
        if (particlePositions.length === 0) {
            console.error("❌ Keine Partikel für die Form generiert!");
            return;
        }

        for (let i = 0; i < this.particlesCount; i++) {
            const pos = particlePositions[i % particlePositions.length]; 
            const speed = Math.random() * 2 + 1;

            this.particles.push({
                x: pos.x,
                y: pos.y,
                vx: (pos.x - centerX) * speed * 0.01,
                vy: (pos.y - centerY) * speed * 0.01,
                color: Math.random() > 0.5 ? this.color1 : this.color2,
                alpha: 1
            });
        }

        requestAnimationFrame(() => this.animate());
    }

    private animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles = this.particles.filter(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.01;
            return p.alpha > 0;
        });

        this.drawParticles();

        if (this.particles.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
    }

    private drawParticles() {
        this.particles.forEach(p => {
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fillStyle = p.color;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, this.size, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.ctx.globalAlpha = 1;
    }
}
