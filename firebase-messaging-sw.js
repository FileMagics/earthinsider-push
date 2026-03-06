importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDf3nXOyLE0Z5vfCNLvHI3A_U8PsVXG3jE",
    projectId: "n8n-notification-push",
    messagingSenderId: "472906773403",
    appId: "1:472906773403:web:d08f0b6b3991790c64673e"
});

const messaging = firebase.messaging();

// 1000000% Working Click Handler (Cross-Domain Supported)
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Click karte hi notification band karo

    // N8n se aaya hua data wala link nikalo
    let urlToOpen = "https://www.earthinsider.in";
    if (event.notification.data && event.notification.data.click_url) {
        urlToOpen = event.notification.data.click_url;
    }

    // Browser ko direct command - Naya window/tab kholo!
    event.waitUntil(
        clients.openWindow(urlToOpen)
    );
});
