'use strict'

import { firebaseConfig } from '../conf.js';
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection = db.collection('messages');

const message = document.getElementById('message');
const form = document.querySelector('form');

form.addEventListener('submit', e => {
  e.preventDefault();

  collection.add({
    messages: message.value,
  })
    .then(doc => {
      console.log(`${doc.id} added.`);
      message.value = '';
      message.focus();
    })
    .catch(error => {
      console.log(error);
    });
});

message.focus();
