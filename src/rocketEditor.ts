import { RocketPreview } from './rocketPreview.js';
import MingiDB from 'https://github.com/JirkaDellOro/MingiDB';

// Typ für Raketenobjekte
interface Rocket {
    _id?: string;
    name: string;
    size: number;
    radius: number;
    secondaryParticles: number;
    shape: string;
}

// Initialisierung der Datenbank
const db = new MingiDB('fireworkDB');
db.collection<Rocket>('rockets');

document.addEventListener("DOMContentLoaded", () => {
    const rocketForm = document.getElementById("rocketForm") as HTMLFormElement;
    const previewCanvas = document.getElementById("previewCanvas") as HTMLCanvasElement;
    const previewCtx = previewCanvas.getContext("2d");
    const rocketTable = document.getElementById("rocketTableBody") as HTMLTableElement;

    // Event Listener für das Formular
    rocketForm.addEventListener("submit", (event) => {
        event.preventDefault();
        saveRocket();
    });

    function saveRocket() {
        const formData = new FormData(rocketForm);
        const rocketData: Rocket = {
            name: formData.get("rocketName") as string,
            size: Number(formData.get("rocketSize")),
            radius: Number(formData.get("rocketRadius")),
            secondaryParticles: Number(formData.get("rocketSecondaryParticles")),
            shape: formData.get("rocketShape") as string
        };
        
        db.collection<Rocket>('rockets').insert(rocketData);
        renderRocketTable();
    }

    function renderRocketTable() {
        rocketTable.innerHTML = "";
        const rockets: Rocket[] = db.collection<Rocket>('rockets').find();
        
        rockets.forEach((rocket: Rocket) => {
            const row = rocketTable.insertRow();
            row.insertCell(0).textContent = rocket.name;
            row.insertCell(1).textContent = rocket.size.toString();
            row.insertCell(2).textContent = rocket.radius.toString();
            row.insertCell(3).textContent = rocket.secondaryParticles.toString();
            row.insertCell(4).textContent = rocket.shape;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Löschen";
            deleteButton.addEventListener("click", () => {
                if (rocket._id) {
                    db.collection<Rocket>('rockets').remove({ _id: rocket._id });
                }
                renderRocketTable();
            });
            row.insertCell(5).appendChild(deleteButton);
        });
    }
    
    renderRocketTable();
});

export class RocketEditor {
    private container: HTMLElement;
    private rocketPreview: RocketPreview | null = null;

    constructor(container: HTMLElement) {
        this.container = container;
        this.initialize();
    }

    private initialize() {
        const canvas = document.getElementById('previewCanvas') as HTMLCanvasElement;
        if (canvas) {
            this.rocketPreview = new RocketPreview('previewCanvas');
            this.setupInputs();
            this.updatePreview();
            this.setupNavigation();
        } else {
            console.error("Canvas für RocketPreview wurde nicht gefunden!");
        }
    }

    private setupInputs() {
        const inputIds = [
            "rocketSize",
            "rocketRadius",
            "rocketParticles",
            "rocketSecondaryParticles",
            "rocketColor",
            "rocketColorSecondary",
            "rocketShape"
        ];

        inputIds.forEach(id => {
            const input = document.getElementById(id) as HTMLInputElement | null;
            if (input) {
                input.addEventListener("input", () => this.updatePreview());
            }
        });
    }

    private updatePreview() {
        if (!this.rocketPreview) return;

        const size = parseInt((document.getElementById("rocketSize") as HTMLInputElement).value);
        const radius = parseInt((document.getElementById("rocketRadius") as HTMLInputElement).value);
        const particles = parseInt((document.getElementById("rocketParticles") as HTMLInputElement).value);
        const secondaryParticles = parseInt((document.getElementById("rocketSecondaryParticles") as HTMLInputElement).value);
        const color1 = (document.getElementById("rocketColor") as HTMLInputElement).value;
        const color2 = (document.getElementById("rocketColorSecondary") as HTMLInputElement).value;
        const shape = (document.getElementById("rocketShape") as HTMLSelectElement).value;

        this.rocketPreview.updatePreview(size, color1, color2, particles, secondaryParticles, radius, shape);
    }

    private setupNavigation() {
        document.getElementById("backToSimulator")?.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }
}
