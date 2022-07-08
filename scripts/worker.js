// Wir setzen nun global auf unseren Worker einen Event-Listener
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
addEventListener("message", message => {
    // Hier prüpft der Worker, was die message enthält (wurde von uns im anderen Skript definiert)
    if (message.data.command === "generatePrimes") {
        generatePrimes(message.data.quota);
    }
});

function generatePrimes(quota) {

    function isPrime(n) {
        for (let c = 2; c <= Math.sqrt(n); ++c) {
            if (n % c === 0) {
                return false;
            }
        }
        return true;
    }

    const primes = [];
    const maximum = 1000000;

    while (primes.length < quota) {
        const candidate = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }

    postMessage(primes.length);
}
