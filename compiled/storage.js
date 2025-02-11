var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/lhe48151/mingidb.php";
const collection = "rockets"; // Name der Sammlung in MingiDB
export function saveRocket(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = new URLSearchParams();
        query.set("command", "insert");
        query.set("collection", collection);
        query.set("data", JSON.stringify(data));
        try {
            const response = yield fetch(url + "?" + query.toString());
            const responseText = yield response.text();
            console.log("Speichern erfolgreich:", responseText);
            alert("Rakete erfolgreich gespeichert!");
        }
        catch (error) {
            console.error("Fehler beim Speichern:", error);
            alert("Fehler beim Speichern der Rakete!");
        }
    });
}
export function loadRockets() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = new URLSearchParams();
        query.set("command", "find");
        query.set("collection", collection);
        try {
            const response = yield fetch(url + "?" + query.toString());
            const json = yield response.json();
            console.log("Geladene Raketen:", json);
            if (Array.isArray(json)) {
                return json;
            }
            else {
                console.error("Unerwartetes JSON-Format:", json);
                return [];
            }
        }
        catch (error) {
            console.error("Fehler beim Abrufen der Raketen:", error);
            return [];
        }
    });
}
export function displayRockets(rockets) {
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
}
;
export function deleteRocket(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = new URLSearchParams();
        query.set("command", "delete");
        query.set("collection", collection);
        query.set("data", JSON.stringify({ name }));
        try {
            const response = yield fetch(url + "?" + query.toString());
            const responseText = yield response.text();
            console.log(`Rakete ${name} gelöscht:`, responseText);
        }
        catch (error) {
            console.error("Fehler beim Löschen der Rakete:", error);
        }
    });
}
