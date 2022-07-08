// Classes in JS
// Syntactic Sugar für Objekt-Erstellung
// function introduce() {
//     console.log(`Hi my Name is ${this.name}`);
// }

// function Person(name) {
//     // this ist ein Platzhalter für die neuerstellte Instanz des Objektes
//     this.name = name;
//     this.introduce = introduce;
// }

// const p1 = new Person("Max");
// p1.name; // => "Max"
// p1.introduce(); 

// Neue Methode ist das class Keyword:

class Person {
    // Mit hashtag definiere ich ein privates Feld
    // Kann nur noch durch klassen-Methoden aufgerufen werden und nicht direkt
    #age;
    constructor (firstName, lastName, age, gender) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
    }
    // Hier wird ein setter definiert, dieser wird nun immer aufgerufen wenn ich age etwas zuweise
    // age = 44
    set age(newAge) {
        console.log("setter wurde aufgerufen");
        if (newAge < this.age) {
            console.error("Man kann nicht jünger werden!");
        }
        else {
            this.#age = newAge;
        }
    }

    // getter definieren:
    get age() {
        console.log("Getter wurde aufgerufen");
        return this.#age;
    }

    // Es können auch private Methoden erstellt werden
    #introduce() {
        return `Hi my name is ${this.firstName} ${this.lastName}!`;
    }
    introduceSelf() {
        console.log(this.#introduce());
        return this.#introduce();
    }
}

const p1 = new Person("Max", "Mustermann", 29, "male");

// Mit extends leiten wir eine Klasse von einer basis Klasse ab
class Student extends Person {
    constructor (firstName, lastName, age, gender, schoolClass) {
        super(firstName, lastName, age, gender);
        this.schoolClass = schoolClass;
    }
    showGrade() {
        return Math.floor(Math.random() * 6) + 1;
    }
    introduceSelf(){
        // // let output = super.introduceSelf();
        // output += ` I'm in class ${this.schoolClass}.`
        // console.log(output);
        // return output;
        console.log(`My name is ${this.firstName} and I'm in class ${this.schoolClass}`);
    }
    // Keine überladung
    // introduceSelf(test) {
    //     console.log(`My name is ${this.firstName} and I'm in class ${this.schoolClass} ${test}`);
    // }
    // Trick zur Überladung: https://www.geeksforgeeks.org/function-overloading-in-javascript/
}

const p2 = new Student("Erika", "Musterfrau", 17 , "female", 11);

// Erstellt eine Klasse Teacher, die von Person abgeleitet wird und zusätzlich ein private field mit subject hat
// Die Methode introduceSelf() soll erweiter oder überschrieben werden um zusätzlich das subject anzuzeigen
// Zusätzlich einen getter und setter für subject erstellen

// Lambdas
// sind kürzere alternativen zu den anonymen Funktionen
// Nennt man auch Pfeil oder Arrow Functions
// Werden häufig als Parameter für anderen Funktionen benutzt
// Sparen function Keyword, Klammern und return ein solange sie einzeilig sind

const add = (num1, num2) => num1 + num2; 
let sum = add(5,8);

// array-höhere Funktionen
const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// arr.forEach(callback)
// Iteriert über jedes Element des Arrays und führt damit die callback-Methode aus

function logNumber(num) {
    console.log(num);
}
numArr.forEach(logNumber);

console.log("Jetzt mit lambda:")
// Klammern werden bei einer lambda Funktion nur benötigt, wenn wir mehr als einen Parameter haben
numArr.forEach((num, index) => {
    console.log("Nummer: " + num + "| Index: " + index);
});

// arr.filter(callback)
// Gibt ein neues Array zurück, das aus den Elementen besteht bei denen der callback true ergeben hat

let evenNums = numArr.filter((num) => num % 2 === 0);
let oddNums = numArr.filter((num) => num % 2 !== 0);

// arr.map(callback)
// Gibt ein neues Array zurück, das aus den Elementen des Arrays besteht auf denen die callback Funktion angewendet wurde

evenNums = evenNums.map((num) => num*2);
console.log(evenNums);

// arr.reduce(callback(mit zwei Parametern))
// Iteriert über das Array und gibt einen einzigen Wert zurück

sum = numArr.reduce((sum, number) => sum + number);
console.log(sum);

// arr.every(callback)
// Gibt true zurück, falls der callback bei jedem Element des Arrays true ergibt
console.log(
    numArr.every((num) => num > 0)
);

// arr.some(callback)
// Gibt true zurück, falls der callback bei mindestens einem element true ergibt
console.log(evenNums.some(
    num => num > 8
));

console.log(evenNums);
// arr.fill(neuerWert, Startindex, Endindex )
// startindex ist inkludiert endindex nicht
evenNums.fill(Math.random() * 20, 3);
console.log(evenNums);
let emptyArr = new Array(20);
emptyArr.fill(5, 0, 3);
console.log(emptyArr);

// In Kombi mit .forEach() können wir unser Array mit Zufallswerten füllen
emptyArr.forEach((number, index) => {
    let randomNumber = Math.floor(Math.random() * 50) + 1;
    emptyArr.fill(randomNumber, index);
});
console.log(emptyArr);

// Generators in JavaScript
// Im Gegensatz zu normalen Funktionen, müssen Generatoren nicht immer komplett ausgeführt werden
// Sie können uns jeden Zwischenwert einzeln übergeben
// Syntax
// function* generator(limit) {
// yield limit;    
// }

function* numGenerator(limit) {
    for (let i = 0; i < limit; i++) {
        yield i;
    }
}

const numbers = numGenerator(10);
// Um auf Werte zuzugreifen muss der Generator gestartet werden
let step = numbers.next();
// step ist nun ein Objekt mit value: 1 und done: false
console.log(step);
console.log(step.value);
// Können nun so lange numbers.next() aufurufen bis die Endbedingung erreicht ist
// Ab dann ist das objekt value: undefined und done: true
// Anwendungsfall: id-Generator
