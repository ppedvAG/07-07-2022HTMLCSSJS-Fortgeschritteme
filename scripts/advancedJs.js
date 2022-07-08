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
}

const p2 = new Student("Erika", "Musterfrau", 17 , "female", 11);

// Erstellt eine Klasse Teacher, die von Person abgeleitet wird und zusätzlich ein private field mit subject hat
// Die Methode introduceSelf() soll erweiter oder überschrieben werden um zusätzlich das subject anzuzeigen
// Zusätzlich einen getter und setter für subject erstellen