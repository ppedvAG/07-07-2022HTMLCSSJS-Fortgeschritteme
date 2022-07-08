// Die FileReaderAPI gibt uns die Möglichkeit den User Dateien in den Browser einlesen zu lassen
// Ist kein wahrer Upload, da es nicht auf dem server gespeichert wird

const reader = document.querySelector("#read");

reader.addEventListener("change", function() {
    let fileReader = new FileReader();
    if (fileReader === "undefined") {
        console.error("FileReader wird nicht unterstützt");
    }
    console.log(this.files);
    let file = this.files.item(0);

    // Einleseprozess beginnt
    fileReader.addEventListener("loadstart", load_start);

    // Einleseprozess wurde erfolgreich abgeschlossen
    fileReader.addEventListener("load", on_load);

    // Wird ausgelöst sobald der Einleseprozess endet egal ob mit oder ohne Fehler
    fileReader.addEventListener("loaded", load_end);

    //Falls Prozess abgebrochen wird
    fileReader.addEventListener("abort", on_abort);

    // Falls ein Fehler auftritt
    fileReader.addEventListener("error", on_error);

    // Jedes mal wenn ein Byte eingelesen wird, aber maximal alle 50 ms
    fileReader.addEventListener("progress", on_progress);

    fileReader.readAsText(file);
});

function load_start() {
    console.log("Einleseprozess begonnen...");
}

function on_load() {
    console.log("Einleseprozess erfolgreich abgeschlossen!");
    document.querySelector("#output").innerText = this.result;
}

function load_end() {
    console.log("Einleseprozess beendet");
}

function on_abort() {
    console.log("Einleseprozess wurde abgebrochen");
}

function on_error(ev) {
    console.log("Folgender Fehler ist aufgetreten:");
    console.error(ev.error);
}

function on_progress(ev) {
    console.log("Wird eingelesen...");
    console.log(ev.total);
}