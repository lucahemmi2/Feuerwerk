export class ExplosionShapes {
    static generateParticles(shape: string, centerX: number, centerY: number, explosionRadius: number): { x: number; y: number }[] {
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

