var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RocketPreview } from './rocketPreview.js';
import { saveRocket, loadRockets, displayRockets } from './storage.js';
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
    constructor(container) {
        this.rocketPreview = null;
        this.initialize();
    }
    initialize() {
        return __awaiter(this, void 0, void 0, function* () {
            const canvas = document.getElementById('previewCanvas');
            if (canvas) {
                this.rocketPreview = new RocketPreview('previewCanvas');
                this.setupInputs();
                this.updatePreview();
                this.toggleSettings();
                // Lade gespeicherte Raketen und zeige sie an
                const rockets = yield loadRockets();
                displayRockets(rockets);
            }
            else {
                console.error("Canvas nicht gefunden");
            }
        });
    }
    setupInputs() {
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
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener("input", () => this.updatePreview());
            }
        });
        // Event-Listener für das Formular
        const rocketForm = document.getElementById("rocketForm");
        if (rocketForm) {
            rocketForm.addEventListener("submit", (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                // Erstelle das Rocket-Objekt mit allen Werten aus den Eingabefeldern
                const rocketData = {
                    name: document.getElementById("rocketName").value,
                    size: Number(document.getElementById("rocketSize").value),
                    radius: Number(document.getElementById("rocketRadius").value),
                    particles: Number(document.getElementById("rocketParticles").value),
                    secondaryParticles: Number(document.getElementById("rocketSecondaryParticles").value),
                    color1: document.getElementById("rocketColor").value,
                    color2: document.getElementById("rocketColorSecondary").value,
                    shape: document.getElementById("rocketShape").value
                };
                yield saveRocket(rocketData); // Rocket-Objekt an saveRocket() übergeben
            }));
        }
    }
    toggleSliders(shape) {
        const radiusSlider = document.getElementById("rocketRadius");
        const secondaryParticlesSlider = document.getElementById("rocketSecondaryParticles");
        const radiusLabel = document.querySelector("label[for='rocketRadius']");
        const secondaryParticlesLabel = document.querySelector("label[for='rocketSecondaryParticles']");
        if (shape === "heart" || shape === "star") {
            radiusSlider.style.display = "none";
            secondaryParticlesSlider.style.display = "none";
            radiusLabel.style.display = "none";
            secondaryParticlesLabel.style.display = "none";
        }
        else {
            radiusSlider.style.display = "block";
            secondaryParticlesSlider.style.display = "block";
            radiusLabel.style.display = "block";
            secondaryParticlesLabel.style.display = "block";
        }
    }
    toggleSettings() {
        const settingsSection = document.getElementById("rocket-settings");
        const backToSimulatorButton = document.getElementById("backToSimulator");
        const canvas = document.getElementById("previewCanvas");
        if (settingsSection && backToSimulatorButton && canvas) {
            backToSimulatorButton.addEventListener("click", () => {
                if (settingsSection.style.display === "none" || settingsSection.style.display === "") {
                    // Einstellungen einblenden und Canvas verkleinern
                    settingsSection.style.display = "block";
                    canvas.width = 800; // Standardgröße oder deine ursprüngliche Breite
                    canvas.height = 600; // Standardgröße oder deine ursprüngliche Höhe
                }
                else {
                    // Einstellungen ausblenden und Canvas vergrößern
                    settingsSection.style.display = "none";
                    canvas.width = 1200; // Neue Breite
                    canvas.height = 1500; // Neue Höhe
                }
                // Aktualisiere die Vorschau, falls nötig
                if (this.rocketPreview) {
                    this.rocketPreview.updatePreview(document.getElementById("rocketName").value, Number(document.getElementById("rocketSize").value), document.getElementById("rocketColor").value, document.getElementById("rocketColorSecondary").value, Number(document.getElementById("rocketParticles").value), Number(document.getElementById("rocketSecondaryParticles").value), Number(document.getElementById("rocketRadius").value), document.getElementById("rocketShape").value);
                }
            });
        }
    }
    updatePreview() {
        if (!this.rocketPreview)
            return;
        const name = document.getElementById("rocketName").value;
        const size = Number(document.getElementById("rocketSize").value);
        const radius = Number(document.getElementById("rocketRadius").value);
        const particles = Number(document.getElementById("rocketParticles").value);
        const secondaryParticles = Number(document.getElementById("rocketSecondaryParticles").value);
        const color1 = document.getElementById("rocketColor").value;
        const color2 = document.getElementById("rocketColorSecondary").value;
        const shape = document.getElementById("rocketShape").value;
        // Slider je nach Shape-Auswahl ausblenden
        this.toggleSliders(shape);
        // Live-Preview aktualisieren mit Übergabe der Benutzerdefinierten Werte
        this.rocketPreview.updatePreview(name, size, color1, color2, particles, secondaryParticles, radius, shape);
    }
}
