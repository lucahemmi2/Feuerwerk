import { RocketEditor } from './rocketEditor.js';
import { FireworkSimulator } from './fireworkSimulator.js';
// Hilfsfunktion zum Initialisieren von Modulen
function initializeComponent(elementId, initializer) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element mit ID '${elementId}' wurde nicht gefunden.`);
        return null;
    }
    return initializer(element);
}
// Initialisiere den Raketen-Editor
initializeComponent('editor', (element) => new RocketEditor(element));
// Initialisiere den Feuerwerk-Simulator
initializeComponent('fireworkCanvas', () => new FireworkSimulator('fireworkCanvas'));
