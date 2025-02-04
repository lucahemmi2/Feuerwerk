import { RocketEditor } from './rocketEditor.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log("🌐 Dokument vollständig geladen!");

    function initializeComponent<T>(
        elementId: string,
        initializer: (element: HTMLElement) => T
    ): T | null {
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

    // Event-Listener für den Button zum Editor
    document.getElementById("toEditor")?.addEventListener("click", () => {
        window.location.href = "rockeditor.html";
    });
});
