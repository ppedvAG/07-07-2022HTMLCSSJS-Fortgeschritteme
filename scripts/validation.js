// Contraint Validation API
// https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation

const passwordInp = document.querySelector("#password");

// Lambdas in JS

function test() {
    return true;
}

const multiply = (x, y) => x * y;
multiply(5,5);

passwordInp.addEventListener("focus", function (ev) {
    if (passwordInp.validity.valueMissing) {
        passwordInp.setCustomValidity("Das Passwort darf nicht leer sein.");
        passwordInp.reportValidity();
    } else {
        passwordInp.setCustomValidity("");
    }
});

// Mögliche validity Props
/*
    patternMismatch - Inhalt stimmt nicht mit pattern überein
    tooLong - Inhalt ist zu lang
    tooShort - Inhalt ist zu kurz
    rangeOverflow - Wert höher ist als im max-Attribut bestimmt
    rangeunderflow - Wert niedriger ist als im min-Attribut bestimmt
    typeMismatch - Wert ist nicht der richtige Typ, z.B. email ohne @
    valid - Gibt true zurück, wenn alles gültig ist
    valueMissing - Wenn das Input-Element das Attribut required hat und das Feld leer ist
*/

passwordInp.addEventListener("keyup", function (ev) {
    if (passwordInp.validity.tooShort) {
        passwordInp.setCustomValidity(`Das Passwort muss mindestens 8 Zeichen lang sein. Gerade hat es ${passwordInp.value.length} Zeichen.`);
        // Erlaubt es uns eine eigene Fehlermeldung zu schreiben
        // Solange diese kein leerer String ist, gilt die form als invalid
        passwordInp.reportValidity();
        // Zeigt uns die Fehlermeldung an wenn das Input-Element ungültig ist
    } else {
        // Entfernen die Error-Message sobald das Input-Feld gültig ist
        passwordInp.setCustomValidity("");
    }
})

document.querySelector("form").addEventListener("submit", function (ev) {
    // Auf die Form angewendet verhindert event.preventDefault() das Neuladen der Seite bei senden der Form
    ev.preventDefault();
})

// Wir holen unsere Inputs als Referenz
const zipCode = document.querySelector("#zipCode");
const country = document.querySelector("#country");


function checkPlz() {
    // Hier legen wir unsere Einschränkungen fest, in diesem Fall wie dei PLZ aufgebaut sind
    const constraints = {
        // Zwei \ um den zweiten \ zu escapen
        ch: ['^(CH-)?\\d{4}$', "Schweizerische PLZ müssen aus genau 4 Zeichen bestehen: e.g. CH-1950 or 1950"],
        fr: ['^(F-)?\\d{5}$', "Französische PLZ müssen aus genau 5 Zeichen bestehen: e.g. F-75012 or 75012"],
        de: ['^(D-)?\\d{5}$', "Deutsche PLZ müssen aus genau 5 Zeichen bestehen: e.g. D-12345 or 12345"]
    }

    // Hier nehmen wir uns die tatsächlichen Textwerte aus den Inputs
    const countryValue = country.value;
    const zipCodeValue = zipCode.value;

    // Hier wird eine konkrete Einschränkung ausgewählt basierend auf dem ausgewählten Land
    const constraint = new RegExp(constraints[countryValue][0], "");

    // Hier wird geprüft ob die PLZ mit der RegEx aus constraint übereinstimmt
    if (constraint.test(zipCodeValue)) {
        // Falls ja wird die CustomValidity auf ein leeren String gesetzt => Input ist gültig
        zipCode.setCustomValidity("");
    }
    else {
        // Falls es nicht mit der RegEx übereinstimmt, setzen wir die Fehlermeldung auf die im Array enthaltene
        zipCode.setCustomValidity(constraints[countryValue][1]);
        // Mit reportValidity wird die Fehlermeldung im Browser sofort angezeigt und nicht erst nach klick auf submit
        zipCode.reportValidity();
    }
}

zipCode.addEventListener("input", checkPlz);
country.addEventListener("input", checkPlz);

// Wir wollen eine neue Form erstellen, die Form soll aus 2x Input type password und 1x Input type submit bestehen
// Wir wollen, dass das Passwort eine mindestlänge von 8 Zeichen hat und dass die Form erst abgesendet werden kann, wenn beide Passwörter übereinstimmen


const password = document.querySelector("#passwordEx");
const confirmation = document.querySelector("#confirmation");
const submitBtn = document.querySelector("#pwSubmit");


function checkPassword() {
    if (password.value === confirmation.value) {
        confirmation.setCustomValidity("");
        submitBtn.removeAttribute("disabled");
    }
    else {
        confirmation.setCustomValidity("Die Passwörter stimmen nicht überein");
        confirmation.reportValidity();
        submitBtn.setAttribute("disabled", "");

    }
}
confirmation.addEventListener("keyup", checkPassword);
password.addEventListener("change", checkPassword);


// === Prüft ob Typ und Wert gleich sind
// !== Prüft ob Typ oder Wert ungleich sind

console.log(submitBtn.classList);
// node.classList gibt uns zugriff auf die Klassen, die eine HTML-Node besitzt
// mit der Methode node.classList.add("neueKlasse") können wir eine neue Klasse hinzufügen
// mit der Methode node.classList.contains("neueKlasse") können wir prüfen ob eine Klasse bereits vorhanden ist 
// mit der Methode node.classList.remove("neueKlasse") können wir eine Klasse entfernen

// node.id
// Gibt id der Node aus
console.log(submitBtn.id);
