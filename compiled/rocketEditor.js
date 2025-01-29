export class RocketEditor {
    constructor(container) {
        this.container = container;
        this.render();
    }
    render() {
        this.container.innerHTML = `
      <div>
        <label for="rocketEditor-size">Größe:</label>
        <input type="range" id="rocketEditor-size" min="10" max="100" value="50">
        <span id="rocketEditor-size-label">50</span>
      </div>
      <div>
        <label for="rocketEditor-duration">Anzeigedauer (s):</label>
        <input type="range" id="rocketEditor-duration" min="1" max="10" value="5">
        <span id="rocketEditor-duration-label">5</span>
      </div>
      <div>
        <label for="rocketEditor-radius">Explosionsradius:</label>
        <input type="range" id="rocketEditor-radius" min="10" max="100" value="50">
      </div>
      <div>
        <label for="rocketEditor-particles">Partikelanzahl:</label>
        <input type="number" id="rocketEditor-particles" min="10" max="500" value="100">
      </div>
      <button id="rocketEditor-saveRocket">Rakete speichern</button>
      <div id="rocketEditor-feedback" style="color: green; margin-top: 10px;"></div>
    `;
        this.setupSliders();
        const saveButton = this.container.querySelector('#rocketEditor-saveRocket');
        if (saveButton) {
            saveButton.addEventListener('click', (event) => {
                event.preventDefault(); // Verhindert das Zurückwechseln
                this.saveRocket();
            });
        }
    }
    setupSliders() {
        const sizeSlider = this.container.querySelector('#rocketEditor-size');
        const sizeLabel = this.container.querySelector('#rocketEditor-size-label');
        const durationSlider = this.container.querySelector('#rocketEditor-duration');
        const durationLabel = this.container.querySelector('#rocketEditor-duration-label');
        sizeSlider.addEventListener('input', () => {
            sizeLabel.textContent = sizeSlider.value;
        });
        durationSlider.addEventListener('input', () => {
            durationLabel.textContent = durationSlider.value;
        });
    }
    saveRocket() {
        const sizeSlider = this.container.querySelector('#rocketEditor-size');
        const durationSlider = this.container.querySelector('#rocketEditor-duration');
        const radiusInput = this.container.querySelector('#rocketEditor-radius');
        const particlesInput = this.container.querySelector('#rocketEditor-particles');
        if (!sizeSlider || !durationSlider || !radiusInput || !particlesInput) {
            console.error('Eingabefelder konnten nicht gefunden werden.');
            return;
        }
        const size = parseInt(sizeSlider.value);
        const duration = parseInt(durationSlider.value);
        const radius = parseInt(radiusInput.value);
        const particles = parseInt(particlesInput.value);
        if (isNaN(size) || isNaN(duration) || isNaN(radius) || isNaN(particles)) {
            this.showFeedback('Ungültige Eingabe. Bitte überprüfen!', 'red');
            return;
        }
        const rocket = { size, duration, radius, particles };
        console.log('Rakete gespeichert:', rocket);
        this.showFeedback('Rakete erfolgreich gespeichert!', 'green');
    }
    showFeedback(message, color) {
        const feedbackElement = this.container.querySelector('#rocketEditor-feedback');
        if (feedbackElement) {
            feedbackElement.textContent = message;
            feedbackElement.style.color = color;
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const sizeSlider = document.getElementById("rocketSize");
    const sizeLabel = document.getElementById("rocketSizeLabel");
    const durationSlider = document.getElementById("rocketDuration");
    const durationLabel = document.getElementById("rocketDurationLabel");
    if (sizeSlider && sizeLabel) {
        sizeSlider.addEventListener("input", () => {
            const sizeOptions = ["Klein", "Mittel", "Groß"];
            sizeLabel.textContent = sizeOptions[parseInt(sizeSlider.value) - 1];
        });
    }
    if (durationSlider && durationLabel) {
        durationSlider.addEventListener("input", () => {
            const durationOptions = ["Kurz", "Normal", "Lang"];
            durationLabel.textContent = durationOptions[parseInt(durationSlider.value) - 1];
        });
    }
});
