const generate = document.querySelector("#generate");

function generatePrimes(quota) {
    function isPrime(n) {
        for (let i = 2; i < Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    const primes = [];
    const maximum = 1000000;

    while (primes.length < quota) {
        const possiblePrime = Math.floor(Math.random() * (maximum + 1));
        if (isPrime(possiblePrime)) {
            primes.push(possiblePrime);
        }
    }
    return primes;
}

generate.addEventListener("click", () => {
    const quota = document.querySelector("#quota").value;
    const primes = generatePrimes(quota);
    document.querySelector("#output").innerText = `Es wurden ${primes.length} generiert!`;
});
