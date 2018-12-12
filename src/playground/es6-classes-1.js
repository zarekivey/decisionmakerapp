
class Person { // Class
    constructor (name = 'Anonymous', age = 0) {
        this.name = name; // This refers to the instance
        this.age = age;
    }
    getGreeting() {
        return `Hi. I am ${this.name}!`;
    }
    getDescription() {
        return `${this.name} is ${this.age} years old`;
    }
}

class Student extends Person { // Subclass
    constructor(name, age, major) {
        super(name, age); // This refers to the parent function, calling ti with the datat we want to access
        this.major = major;
    }
    hasMajor() {
        return !!this.major; // This returns true if they have a major, vice versa
    }
    getDescription() { // We can override and manipulate methods inherited by the parent class
        let description = super.getDescription();
        
        if (this.hasMajor()) {
            description += `Their major is ${this.major}.`;
        }

        return description;
    }
}

class Traveler extends Person {
    constructor(name, age, homeLocation) {
        super(name, age);
        this.homeLocation = homeLocation;
    }
    getGreeting() {
        let greeting = super.getGreeting();

        if (this.homeLocation) {
            greeting += ` I am visiting from ${this.homeLocation}.`;
        }

        return greeting;
    }
}

const me = new Traveler('Zarek Ivey', 19, 'Atlanta');
console.log(me.getGreeting());

const other = new Traveler();
console.log(other.getGreeting());