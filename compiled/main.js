import { RocketEditor } from './rocketEditor.js';
import { FireworkSimulator } from './fireworkSimulator.js';
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    console.log("🌐 Dokument vollständig geladen!");
    function initializeComponent(elementId, initializer) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`❌ Element mit ID '${elementId}' wurde nicht gefunden.`);
            return null;
        }
        console.log(`✅ Element mit ID '${elementId}' gefunden.`);
        return initializer(element);
    }
    // Initialisiere den Raketen-Editor
    initializeComponent('editor', (element) => new RocketEditor(element));
    // Initialisiere den Feuerwerk-Simulator
    initializeComponent('fireworkCanvas', () => new FireworkSimulator('fireworkCanvas'));
    // Event-Listener für den Button zum Editor
    (_a = document.getElementById("toEditor")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        window.location.href = "rockeditor.html";
    });
});
