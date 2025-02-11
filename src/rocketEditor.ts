import { RocketPreview } from './rocketPreview.js';
import { saveRocket, loadRockets, displayRockets, deleteRocket } from './storage.js';


document.addEventListener("DOMContentLoaded", () => {
    const editorContainer = document.getElementById("editor");
    if (!editorContainer) {
        console.error("Editor-Container nicht gefunden");
        return;
    }

    // Initialisiere den RocketEditor
    new RocketEditor(editorContainer);
});

export class RocketEditor {
    private rocketPreview: RocketPreview | null = null;

    constructor(container: HTMLElement) {
        this.initialize();
    }

    async initialize() {
        const canvas = document.getElementById('previewCanvas') as HTMLCanvasElement;
        if (canvas) {
            this.rocketPreview = new RocketPreview('previewCanvas');
            this.setupInputs();
            this.updatePreview();
            this.toggleSettings();

            // Lade gespeicherte Raketen und zeige sie an
            const rockets = await loadRockets();
            displayRockets(rockets);
        } else {
            console.error("Canvas nicht gefunden");
        }
    }

    private setupInputs() {
        const inputIds = [
            "rocketName",
            "rocketSize",
            "rocketRadius",
            "rocketParticles",
            "rocketSecondaryParticles",
            "rocketColor",
            "rocketColorSecondary",
            "rocketShape"
        ];

        inputIds.forEach(id => {
            const input = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
            if (input) {
                input.addEventListener("input", () => this.updatePreview());
            }
        });

        // Event-Listener für das Formular
        const rocketForm = document.getElementById("rocketForm") as HTMLFormElement | null;
        if (rocketForm) {
            rocketForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                // Erstelle das Rocket-Objekt mit allen Werten aus den Eingabefeldern
                const rocketData = {
                    name: (document.getElementById("rocketName") as HTMLInputElement).value,
                    size: Number((document.getElementById("rocketSize") as HTMLInputElement).value),
                    radius: Number((document.getElementById("rocketRadius") as HTMLInputElement).value),
                    particles: Number((document.getElementById("rocketParticles") as HTMLInputElement).value),
                    secondaryParticles: Number((document.getElementById("rocketSecondaryParticles") as HTMLInputElement).value),
                    color1: (document.getElementById("rocketColor") as HTMLInputElement).value,
                    color2: (document.getElementById("rocketColorSecondary") as HTMLInputElement).value,
                    shape: (document.getElementById("rocketShape") as HTMLSelectElement).value
                };

                await saveRocket(rocketData); // Rocket-Objekt an saveRocket() übergeben
            });

        }
    }

    private toggleSliders(shape: string) {
        const radiusSlider = document.getElementById("rocketRadius") as HTMLInputElement;
        const secondaryParticlesSlider = document.getElementById("rocketSecondaryParticles") as HTMLInputElement;
        const radiusLabel = document.querySelector("label[for='rocketRadius']") as HTMLLabelElement;
        const secondaryParticlesLabel = document.querySelector("label[for='rocketSecondaryParticles']") as HTMLLabelElement;

        if (shape === "heart" || shape === "star") {
            radiusSlider.style.display = "none";
            secondaryParticlesSlider.style.display = "none";
            radiusLabel.style.display = "none";
            secondaryParticlesLabel.style.display = "none";
        } else {
            radiusSlider.style.display = "block";
            secondaryParticlesSlider.style.display = "block";
            radiusLabel.style.display = "block";
            secondaryParticlesLabel.style.display = "block";
        }
    }

    private toggleSettings() {
        const settingsSection = document.getElementById("rocket-settings");
        const backToSimulatorButton = document.getElementById("backToSimulator");
        const canvas = document.getElementById("previewCanvas") as HTMLCanvasElement;
    
        if (settingsSection && backToSimulatorButton && canvas) {
            backToSimulatorButton.addEventListener("click", () => {
                if (settingsSection.style.display === "none" || settingsSection.style.display === "") {
                    // Einstellungen einblenden und Canvas verkleinern
                    settingsSection.style.display = "block";
                    canvas.width = 800; // Standardgröße oder deine ursprüngliche Breite
                    canvas.height = 600; // Standardgröße oder deine ursprüngliche Höhe
                } else {
                    // Einstellungen ausblenden und Canvas vergrößern
                    settingsSection.style.display = "none";
                    canvas.width = 1200; // Neue Breite
                    canvas.height = 1500; // Neue Höhe
                }
    
                // Aktualisiere die Vorschau, falls nötig
                if (this.rocketPreview) {
                    this.rocketPreview.updatePreview(
                        (document.getElementById("rocketName") as HTMLInputElement).value,
                        Number((document.getElementById("rocketSize") as HTMLInputElement).value),
                        (document.getElementById("rocketColor") as HTMLInputElement).value,
                        (document.getElementById("rocketColorSecondary") as HTMLInputElement).value,
                        Number((document.getElementById("rocketParticles") as HTMLInputElement).value),
                        Number((document.getElementById("rocketSecondaryParticles") as HTMLInputElement).value),
                        Number((document.getElementById("rocketRadius") as HTMLInputElement).value),
                        (document.getElementById("rocketShape") as HTMLSelectElement).value
                    );
                }
            });
        } 
    }

    private updatePreview() {
        if (!this.rocketPreview) return;

        const name = (document.getElementById("rocketName") as HTMLInputElement).value;
        const size = Number((document.getElementById("rocketSize") as HTMLInputElement).value);
        const radius = Number((document.getElementById("rocketRadius") as HTMLInputElement).value);
        const particles = Number((document.getElementById("rocketParticles") as HTMLInputElement).value);
        const secondaryParticles = Number((document.getElementById("rocketSecondaryParticles") as HTMLInputElement).value);
        const color1 = (document.getElementById("rocketColor") as HTMLInputElement).value;
        const color2 = (document.getElementById("rocketColorSecondary") as HTMLInputElement).value;
        const shape = (document.getElementById("rocketShape") as HTMLSelectElement).value;

        // Slider je nach Shape-Auswahl ausblenden
        this.toggleSliders(shape);

        // Live-Preview aktualisieren mit Übergabe der Benutzerdefinierten Werte
        this.rocketPreview.updatePreview(name, size, color1, color2, particles, secondaryParticles, radius, shape);

    }
}

