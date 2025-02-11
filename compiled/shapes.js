export class ExplosionShapes {
    static generateParticles(shape, centerX, centerY, explosionRadius) {
        let particles = [];
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
    static generateCircle(centerX, centerY, radius) {
        let particles = [];
        for (let i = 0; i < 100; i++) {
            const angle = (i / 100) * Math.PI * 2;
            particles.push({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius
            });
        }
        return particles;
    }
    static generateHeart(centerX, centerY, radius) {
        const heartParticles = [];
        const numParticles = 250;
        for (let i = 0; i < numParticles; i++) {
            const t = (i / numParticles) * (2 * Math.PI);
            const x = centerX + radius * (16 * Math.pow(Math.sin(t), 3));
            const y = centerY - radius * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            heartParticles.push({ x, y });
        }
        return heartParticles;
    }
    static generateStar(centerX, centerY, radius) {
        let particles = [];
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
