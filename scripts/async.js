// Früher v.a. mit callbacks und timeouts
// setTimeout(callback, zeitInMs)
// Der callback wird FRÜHESTENS nach zeitInMs ausgeführt
// setInterval(callback, zeitInMs)

// setTimeout(e => alert("Hi"), 5000);
// setTimeout(func1 (
//     func2(
//         func3(
//             func4(
//
//             )
//         )
//     )
// ))
// Wenn synchroner Code vor dem Timeout länger dauert als die Verzögerung verschiebt sich auch die Ausfürhungszeit des callbacks nach hinten
// Viele Callbacks ergeben eine Pyramid of Doom oder die s.g. Callback-Hell
// Schwer zu lesen und Fehlerbehandlung wird schwieriger

// Um dieses Problem zu beheben wurden die Promises erstellt
// Promises sind das Bindeglied zwischen produzierendem und konsumierendem Code
// Promises haben 3 mögliche Zustände
// pending, d.h. sie haben noch kein ergebnis
// fulfilled, d.h. sie haben erfolgreich ein Ergebnis zurückgeben können
// rejected, d.h. sie sind fehlgeschlagen

let testPromise = new Promise(function(resolve, reject) {
    // Producing Code, er stellt Daten zur Verfügung
    let x = 1;
    if (x === 1) {
        // Falls alles klappt wird resolve aufgerufen und ein wert zurückgegeben
        setTimeout(e => resolve(50), 5000);
    }
    // Falls es scheitert, wird eine Fehlermeldung ausgegeben
    else {
        reject("Wrong value supplied");
    }
})

// Wenn ich mit Daten des Promises arbeiten will benötige ich die Methode .then()
testPromise.then(value => document.querySelector("#output").innerText = value)
    // .then()
    // .then()
    // .then()
    .catch(e => document.querySelector("#output").innerText = e);
// Es reicht ein einziges .catch() am Ende der then-Chain um Fehler an jeder Stelle abzufangen
// Können es aber auch im then() selbst behandeln, falls wir das wollen
// then gibt immer ein Promise zurück
// müssen im then auf den Wert des Promises zugreifen

// fetch-Api
// fetch("Url")
// Fragt Daten mittels HTTP.GET ab
let test = fetch("https://jsonplaceholder.typicode.com/posts/1")
        .then(response => response.json())
        .then(json => document.querySelector("#output").innerText = json.body);

// Async & await
// async und await sind syntactic sugar für then
// async symbolisiert, dass eine asynchrone operation losgeht
// await bedeutet wir warten bis ein ergebnis zurückkommt und damit soll dann etwas gemacht werden => then
// liest sich wie 

async function getPost() {
    try {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts/3");
    // console.log(await response.json()); Wenn wir den Stream hier lesen, kann er in der Zeile darunter nicht mehr gelesen werden
    //! Warum kann ein stream nur einmal eingelsen werden
    let json = await response.json();
    document.querySelector("#output").innerText = json.body;
    }
    catch (error) {
        console.log(error);
        // verhält sich wie promise.catch();
    }
}

document.querySelector("#fetchPost").addEventListener("click", getPost);

// Post mit fetch:
// Als erste wieder wohin POST ausgeführt wird,
fetch('https://jsonplaceholder.typicode.com/posts', {
    // Das Objekt muss die Methode und falls nötig den Inhalt als String enthalten
    method: 'POST',
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    // Hier sagen wir um welche Art von Content es sich handelt und wie er encodiert ist
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));

    // https://jsonplaceholder.typicode.com/guide/
    // Gut zum Üben
