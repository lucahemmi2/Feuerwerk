import { Particle } from './particle.js';
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
export class FireworkSimulator {
    constructor(canvasId) {
        this.rockets = []; // Liste der Raketen
        this.heldRockets = []; // Temporäre Raketenpositionen
        const canvas = document.getElementById(canvasId);
        if (!canvas) {
            throw new Error(`Canvas mit ID "${canvasId}" nicht gefunden.`);
        }
        this.canvas = canvas;
        const context = this.canvas.getContext('2d');
        if (!context) {
            throw new Error('Canvas-Kontext konnte nicht initialisiert werden.');
        }
        this.ctx = context;
        this.init();
    }
    init() {
        // Event-Listener für den Canvas (Raketen platzieren)
        this.canvas.addEventListener('click', (event) => this.placeRocket(event));
        // Doppelklick: Fügt eine spezielle Rakete hinzu
        this.canvas.addEventListener('dblclick', (event) => this.placeSpecialRocket(event));
        // Mausbewegung: Zeigt Position
        this.canvas.addEventListener('mousemove', (event) => this.showMousePosition(event));
        // Maus verlassen: Position ausblenden
        this.canvas.addEventListener('mouseleave', () => this.hideMousePosition());
        // Event-Listener für den Zünderknopf
        const igniteButton = document.getElementById('igniteButton');
        if (igniteButton) {
            igniteButton.addEventListener('click', () => this.igniteRockets());
        }
        // Animation starten
        this.animate();
    }
    placeRocket(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.heldRockets.push({ x, y });
    }
    placeSpecialRocket(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        this.rockets.push(new Rocket(x, y, 70, '#FFD700')); // Besondere Rakete (goldene Farbe)
    }
    showMousePosition(event) {
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        // Zeichne Mauszeiger (nur anzeigen, wenn es nicht gelöscht wurde)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(x, y, 5, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }
    hideMousePosition() {
        // Lösche Canvas nur, wenn Maus den Canvas verlässt
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    igniteRockets() {
        this.heldRockets.forEach(rocket => {
            this.rockets.push(new Rocket(rocket.x, rocket.y, 50, this.getRandomColor()));
        });
        this.heldRockets = []; // Gehaltene Raketen zurücksetzen
    }
    getRandomColor() {
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    animate() {
        // Canvas löschen
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Verblassungseffekt
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Raketen zeichnen
        this.rockets.forEach((rocket, index) => {
            rocket.draw(this.ctx);
            if (rocket.particles.every(particle => particle.lifetime <= 0)) {
                this.rockets.splice(index, 1); // Rakete entfernen, wenn alle Partikel verschwunden sind
            }
        });
        // Animation fortsetzen
        requestAnimationFrame(() => this.animate());
    }
}
