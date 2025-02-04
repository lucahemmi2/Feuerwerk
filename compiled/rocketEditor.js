import { RocketPreview } from './rocketPreview.js';
export class RocketEditor {
    constructor(container) {
        this.rocketPreview = null;
        this.container = container;
        this.initialize();
    }
    initialize() {
        const canvas = document.getElementById('previewCanvas');
        if (canvas) {
            this.rocketPreview = new RocketPreview('previewCanvas');
            this.setupInputs();
            this.updatePreview();
            this.setupNavigation(); // HIER RUFST DU setupNavigation AUF
        }
        else {
            console.error("Canvas für RocketPreview wurde nicht gefunden!");
        }
    }
    setupInputs() {
        const inputIds = [
            "rocketSize",
            "rocketRadius",
            "rocketParticles",
            "rocketSecondaryParticles",
            "rocketColor",
            "rocketColorSecondary"
        ];
        inputIds.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener("input", () => this.updatePreview());
            }
        });
    }
    updatePreview() {
        if (!this.rocketPreview)
            return;
        const size = parseInt(document.getElementById("rocketRadius").value);
        const radius = parseInt(document.getElementById("rocketSize").value);
        const particles = parseInt(document.getElementById("rocketParticles").value);
        const secondaryParticles = parseInt(document.getElementById("rocketSecondaryParticles").value);
        const color1 = document.getElementById("rocketColor").value;
        const color2 = document.getElementById("rocketColorSecondary").value;
        this.rocketPreview.updatePreview(size, color1, color2, particles, secondaryParticles, radius);
    }
    setupNavigation() {
        const backToSimulatorButton = document.getElementById("backToSimulator");
        if (backToSimulatorButton) {
            backToSimulatorButton.addEventListener("click", () => {
                window.location.href = "index.html"; // Stelle sicher, dass die Datei existiert!
            });
        }
    }
}
