'use strict'

import { firebaseConfig } from '../conf.js';
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection = db.collection('messages');

collection.add({
  messages: 'test',
})
.then(doc => {
  console.log(`${doc.id} added.`);
})
.catch(error => {
  console.log(error);
});