export class Effects {
    // Generiere sekundäre Partikel
    public generateSecondaryParticles(centerX: number, centerY: number, explosionRadius: number, secondaryParticlesCount: number, primaryColor: string, secondaryColor: string) {
        const secondaryParticles: { x: number; y: number; vx: number; vy: number; color: string; alpha: number; size: number }[] = [];

        for (let i = 0; i < secondaryParticlesCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * explosionRadius;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const speed = Math.random() * 2 + 0.5;

            secondaryParticles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                color: Math.random() > 0.5 ? primaryColor : secondaryColor,
                alpha: 1, // Start mit voller Deckkraft
                size: Math.random() * 3 + 2 // Größe der sekundären Partikel
            });
        }
        return secondaryParticles;
    }

    // Zeichne Partikel
    public drawParticles(ctx: CanvasRenderingContext2D, particles: { x: number; y: number; color: string; alpha: number; size: number }[]) {
        particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;

            // Zeichne die Partikel mit ihrer Größe
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;
    }



    
}
