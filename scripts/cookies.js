// Cookies in js
// Sind ein Prop vom document
// document.cookie gibt uns einen String zurück in dem alle cookies enthalten sind und mit ; getrennt wurden
// cookies werden in Schlüssel=Wert-Paaren gespeichert
// cookies können auch in den Browser-Dev Tools unter dem Reiter Anwendung => Speicher => Cookies ausgelsen werden

// Funktionen um Cookies zu erstellen, anzuzeigen und zu löschen:

function setCookie(cookieName, cookieValue, expireDays=0) {
    const currentDate = new Date().getTime();
    // Gibt uns die nötigen Millisekunden um das entsprechende Datum zu generieren
    const expireDate = new Date().setTime(currentDate + (expireDays*24*60*60*1000));
    // Erstellt das Datum und fügt es in den String ein
    const expiration = `expires=${new Date(expireDate).toUTCString()};`;
    console.log(expiration);
    // Hier wird der Cookie gesetzt
    document.cookie = `${cookieName}=${cookieValue};${expiration}`;
}

function getCookies() {
    const cookies = document.cookie;
    document.querySelector("#output").innerText = cookies;
}

function deleteCookie(cookieName) {
    // Wenn wir einen Cookie löschen wollen, müssen wir das expiration Date auf ein Datum in der Vergangenheit setzen
    document.cookie = `${cookieName}=; expires=${new Date(0).toUTCString()}`;
}

const showCookie = document.querySelector("#showCookies");
showCookie.addEventListener("click", getCookies);
const deleteCookies = document.querySelector("#deleteCookies");
deleteCookies.addEventListener("click", () => {
    deleteCookie("consent");
});

const consentCookies = document.querySelector("#consent");
consentCookies.addEventListener("click", () => {
    setCookie("consent", "yes", 50);
    document.querySelector(".cookie-banner").style.display = "none";
});

// Versteckt das cookie "banner" falls der cookie bereits gesetzt ist
function showBanner() {
        const cookies = document.cookie;
        if (cookies.includes("consent")) {
            document.querySelector(".cookie-banner").style.display = "none";
        }
        else {
            document.querySelector(".cookie-banner").style.display = "block";
            document.querySelectorAll(".cookie-banner");
        }
}

// Event wird ausgelöst, sobald die Seite fertig geladen hat
window.addEventListener("load", showBanner);

deleteCookies.addEventListener("click", showBanner);

// Session&LocalStorage
// Gültigkeit:
// SessionStorage nur während der Browsersitzung
// localcStorage gilt solange bis er gelöscht wird
// Daten werden nicht an den Server übertragen
// Pro Verbindung, d.h. bei http und https Seiten zwei getrennte Storages
// Maximale Größe: OS und Browser abhängig, laut HTML5 Spezifikation sollten es bis zu 5MB sein

// Teilen sich Props und Methoden
// props:
// local/sessionStorage.length
// Gibt aus wie viele Einträge im Storage sind

// Methoden
// setItem(schlüssel, wert) erstellt einen Eintrag mit entsprechendem Schlüssel & Wert
localStorage.setItem("schlüssel", "wert");
sessionStorage.setItem("schlüssel", "wert");

//! Muss bei Storage um erlaubnis gefragt werden
// Je nach ANwendung, aber an sich ja

// getItem(Schlüssel) gibt uns den Wert des Schlüssels zurück
console.log(sessionStorage.getItem("schlüssel"));
console.log(sessionStorage["schlüssel"]); // Funktioniert identisch

// .key(index) => Gibt den Namen des Schlüssels an dem Index zurück
// .clear() => leert den Storage
// .removeItem(schlüssel) => löscht den Schlüssel und dessen Wert

// sind cookies nuir domainspezifisch