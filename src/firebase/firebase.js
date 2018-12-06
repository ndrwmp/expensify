import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);
const database = firebase.database();
export { firebase, database as default };



// Firebase 101

// subscriptions: when data changes, do something
// on(), once(): 'value', child_removed', 'child_added', 'child_changed'
// https://firebase.google.com/docs/reference/js/firebase.database.Reference#on
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log("child removed: ", snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log("child changed: ", snapshot.key, snapshot.val());
// });

// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log("child added: ", snapshot.key, snapshot.val());
// });

// turning firebase's array-like structure to a JS array
// database.ref('expenses').on('value', (snapshot) => {
//     const expensesArray = [];
//     snapshot.forEach((childSnapshot) => {
//         expensesArray.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expensesArray);
// });

// const expenses = [
//     {
//         description: 'ramen',
//         note: 'twas good',
//         amount: 1000,
//         createdAt: 0
//     }, {
//         description: 'udon',
//         note: 'twas delectable',
//         amount: 1200,
//         createdAt: 10000
//     }, {
//         description: 'christmas cake',
//         note: 'twill be good',
//         amount: 2200,
//         createdAt: 12000
//     }
// ];

// database.ref('expenses').push({
//     ...expenses[0]
// });

// const onValueChange = database.ref().on('value', (snapshot) => {
//     const person = snapshot.val();
//     console.log(`${person.name} is a ${person.job.title} at ${person.job.company}.`);
// });

// database.ref('notes/-LSHu-DqIQ5bLvHNAiJm').update({
//     body: 'Finish the React course'
// });

// database.ref('notes').push({
//     title: 'Course Topics',
//     body: 'React Native, Angular, Python'
// });

// const firebaseNotes = {
//     notes: {
//         skdfjkasdf: {
//             title: 'First note',
//             body: 'This is my note'
//         },
//         asdfasdf: {
//             title: 'Another note',
//             body: 'This is another note'
//         }
//     }
// };

// const notes = [{
//     id: '12', 
//     title: 'First note', 
//     body: 'This is my note'
// }, {
//     id: '761ase',
//     title: 'Another note',
//     body: 'This is another note'
// }];

// database.ref('notes').set(notes);

// const onValueChange = database.ref().on('value', (snapshot) => {
//     const person = snapshot.val();
//     console.log(`${person.name} is a ${person.job.title} at ${person.job.company}.`);
// });

// const database = firebase.database();

// // on() returns the function (snapshot) => {...}
// const onValueChange = database.ref().on('value', (snapshot) => {
//     console.log(snapshot.val());
// }, (e) => {
//     console.log("Error fetching data", e);
// });

// setTimeout(() => {
//     database.ref('age').set(24);
// }, 3500);

// setTimeout(() => {
//     // unsubscribes
//     database.ref().off(onValueChange);
// }, 7000);

// setTimeout(() => {
//     database.ref('age').set(25);
// }, 10500);

// database.ref().set({
//     name: "Andrew Playsted",
//     age: 23,
//     stressLevel: 6,
//     job: {
//         title: 'Substitute Teacher',
//         company: 'HBCSD'
//     },
//     location: {
//         city: 'Los Angeles',
//         country: 'USA'
//     }
// }).then(() => {
//     console.log("Data saved");
// }).catch((error) => {
//     console.log("Error: ", error);
// });

// // database.ref('isSingle').set(null); // equivalent to calling remove()

// database.ref().update({
//     // name: "Drizzle Playstizzle",
//     // age: 230,
//     // job: 'Substitute Teacher', // can add new attributes
//     // isSingle: null // can delete attributes
//     // job: 'Software Developer',
//     // 'location/city': 'Santa Monica' // just doing location: { city: 'Santa Monica' }
//     //                         // deletes country: 'USA' - doesn't work with nesting
//     //                         // so we do this work around
//     stressLevel: 9,
//     'job/company': 'amazon',
//     'location/city': 'Seattle'
// });

// database.ref('age').set(24);

// database.ref().remove()
//     .then(() => {
//         console.log("data was removed");
//     }).catch((error) => {
//         console.log("error: ", error);
//     });