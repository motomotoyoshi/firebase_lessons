'use strict'

import { firebaseConfig } from '../conf.js';
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection = db.collection('messages');

const message = document.getElementById('message');
const form = document.querySelector('form');
const messages = document.getElementById('messages');

collection.get().then(snapshot => {
  snapshot.forEach(doc => {
    const li = document.createElement('li');
    li.textContent = doc.data().message;
    messages.appendChild(li);
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  collection.add({
    message: message.value,
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
