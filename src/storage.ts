const url: string = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/lhe48151/mingidb.php";
const collection: string = "rockets"; // Name der Sammlung in MingiDB

export interface RocketData {
    name: string;
    size: number;
    radius: number;
    particles: number;
    secondaryParticles: number;
    color1: string;
    color2: string;
    shape: string;
}

export async function saveRocket(data: RocketData): Promise<void> {
    const query: URLSearchParams = new URLSearchParams();
    query.set("command", "insert");
    query.set("collection", collection);
    query.set("data", JSON.stringify(data));

    try {
        const response = await fetch(url + "?" + query.toString());
        const responseText = await response.text();
        console.log("Speichern erfolgreich:", responseText);
        alert("Rakete erfolgreich gespeichert!");
    } catch (error) {
        console.error("Fehler beim Speichern:", error);
        alert("Fehler beim Speichern der Rakete!");
    }
}

export async function loadRockets(): Promise<RocketData[]> {
    const query = new URLSearchParams();
    query.set("command", "find");
    query.set("collection", collection);

    try {
        const response = await fetch(url + "?" + query.toString());
        const json = await response.json();
        console.log("Geladene Raketen:", json);

        if (Array.isArray(json)) {
            return json as RocketData[];
        } else {
            console.error("Unerwartetes JSON-Format:", json);
            return [];
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Raketen:", error);
        return [];
    }
}

export function displayRockets(rockets: RocketData[]): void {
    const rocketList = document.getElementById("rockettable");
    if (!rocketList) {
        console.error("Rocket-Liste nicht gefunden.");
        return;
    }
    rocketList.innerHTML = ""; // Liste leeren

    rockets.forEach(rocket => {
        const rocketItem = document.createElement("div");
        rocketItem.classList.add("rocket-item");
        rocketItem.innerHTML = `
            <strong>${rocket.name}</strong> - Größe: ${rocket.size}, Partikel: ${rocket.particles}, Form: ${rocket.shape}
            <button class="delete-btn" data-name="${rocket.name}">Löschen</button>
        `;
        rocketList.appendChild(rocketItem);
    });
};

export async function deleteRocket(name: string): Promise<void> {
    const query = new URLSearchParams();
    query.set("command", "delete");
    query.set("collection", collection);
    query.set("data", JSON.stringify({ name }));

    try {
        const response = await fetch(url + "?" + query.toString());
        const responseText = await response.text();
        console.log(`Rakete ${name} gelöscht:`, responseText);
    } catch (error) {
        console.error("Fehler beim Löschen der Rakete:", error);
    }
}
