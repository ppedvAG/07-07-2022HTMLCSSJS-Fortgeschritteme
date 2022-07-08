// Hier initialisieren wir einen Webworker, also ein Script auf einem anderen Thread
const worker = new Worker("./scripts/worker.js");
// Nested Worker sind inzwischen in den meisten großen Browsern unterstützt
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
// https://chromestatus.com/feature/6080438103703552
document.querySelector("#generate").addEventListener("click", () => {
    const quota = document.querySelector("#quota").value;
    // Hier kommunizieren wir mit unserem worker:
    worker.postMessage(
        {
            command: "generatePrimes",
            quota: quota
        }
    );
});

worker.addEventListener("message", message => {
    document.querySelector("#output").innerText = `Es wurden ${message.data} Primzahlen generiert!`;
});


