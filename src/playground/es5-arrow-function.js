// ES5
var square = function(x){ // Or function square
    return x * x;
};
console.log(square(8));

// ES6 Arrow Functions
const squareArrow = (x) => {
     return x * x;
}; // ES6 arrow function are always anonymous, so they must be assigned to a variable

const squareArrow = (x) => x * x; // arrow function expression syntax. same as above, no return needed

console.log(squareArrow(9));

const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
};

const getFirstName = (fullName) => fullName.split(' ')[0];

console.log(getFirstName('ZarekIvey'));

// arguments object is no longer bound with arrow functions
// the this keyowrd is no longer bound in arrow functions

// Methods and Maps in ES6
const user = {
    name: 'Zarek',
    cities: ['Atlanta', 'Ocala', 'New York'],
    printPlacesLived() { // Methods in ES6 arrow functions and objects
        return this.cities.map((city) => this.name + ' has lived in ' + city); 
            // Map creates an array and allows you to add on that item
    }
};
console.log(user.printPlacesLived());

const multiplier = {
    numbers: [1, 2, 3],
    multiplyBy: 5,
    multiply() {
        return this.numbers.map((number) => number * this.multiplyBy);
    }
};

console.log(multiplier.multiply());
