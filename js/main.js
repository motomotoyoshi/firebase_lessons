'use strict'

import { firebaseConfig } from '../conf.js';
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection = db.collection('messages');

const message = document.getElementById('message');
const form = document.querySelector('form');
const messages = document.getElementById('messages');

collection.orderBy('created').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if (change.type === 'added') {
      const li = document.createElement('li');
      li.textContent = change.doc.data().message;
      messages.appendChild(li);
    }
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const val = message.value.trim();
  if (val === "") {
    return;
  }

  message.value = '';
  message.focus();

  collection.add({
    message: val,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
    .then(doc => {
      console.log(`${doc.id} added.`);
    })
    .catch(error => {
      console.log(error);
    });
});

message.focus();
