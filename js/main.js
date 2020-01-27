'use strict'

import { firebaseConfig } from '../conf.js';
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const collection = db.collection('messages');
const auth = firebase.auth();

const message = document.getElementById('message');
const form = document.querySelector('form');
const messages = document.getElementById('messages');
const login = document.getElementById('login');
const logout = document.getElementById('logout');

login.addEventListener('click', () => {
  auth.signInAnonymously();
});
logout.addEventListener('click', () => {
  auth.signOut();
});

auth.onAuthStateChanged(user => {
  if (user) {
    collection.orderBy('created').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const li = document.createElement('li');
          li.textContent = change.doc.data().message;
          messages.appendChild(li);
        }
      });
    });
    console.log(`Logged in as: ${user.uid}`);
    login.classList.add('hidden');
    [logout, form, messages].forEach(el => {
      el.classList.remove('hidden');
    });
    message.focus();
    return;
  }
  console.log('Nobody is logged in.');
  login.classList.remove('hidden');
  [logout, form, messages].forEach(el => {
    el.classList.add('hidden');
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

