//
// object destructuring
//

// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: "Los Angeles",
//         temp: 59
//     }
// };

// console.log(`${person.name} is ${person.age}.`);

// // const name = person.name;
// // const age = person.age;

// // same as above. added that if the name doesn't exist, default to 'Anonymous'
// const { name = 'Anonymous', age } = person;
// console.log(`${name} is ${age}.`);


// // example
// if (person.location.city && person.location.temp)
//     console.log(`It's ${person.location.temp} in ${person.location.city}.`);

// // grab the city and temp values from person, renaming temp to temperature,
// // and setting a default temperature to 900
// const { city, temp: temperature = 900 } = person.location;

// if (city && temperature)
//     console.log(`It's ${temperature} in ${city}.`);


// // another example
// const book = {
//     title: "Ego is the Enemy",
//     author: "Ryan Holiday",
//     publisher: {
//         name: "Penguin"
//     }
// };

// const { name: publisherName = "Self-published" } = book.publisher;
// console.log(`${publisherName} published this book.`);

//
// array destructuring
//

const address = ['1299 S Juniper St.', 'Philadelphia', 'Pennsylvania', '19147'];

// works but it's unclear what address[1] and address[2] are, immediately
console.log(`You are in ${address[1]}, ${address[2]}.`);

// destructure the array
const [street, city, state, zipcode] = address;
console.log(`You are in ${city}, ${state}.`);

// say you don't need to use the address, just put a comma and it'll skip naming it
// you can also just stop after the ones you need and leave off the rest
// note we only have 3 positions here: an empty one (before the first comma),
// theCity, and theState
const [, theCity, theState = "DefaultState"] = address;
console.log(`You are in ${theCity}, ${theState}.`);

// example
const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

// grab first and third items using array destructuring
const [name, , price] = item;
console.log(`A medium ${name} costs ${price}.`);