importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDf3nXOyLE0Z5vfCNLvHI3A_U8PsVXG3jE",
  projectId: "n8n-notification-push",
  messagingSenderId: "472906773403",
  appId: "1:472906773403:web:d08f0b6b3991790c64673e"
});

const messaging = firebase.messaging();
