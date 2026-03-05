importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDf3nXOyLE0Z5vfCNLvHI3A_U8PsVXG3jE",
    projectId: "n8n-notification-push",
    messagingSenderId: "472906773403",
    appId: "1:472906773403:web:d08f0b6b3991790c64673e"
});

const messaging = firebase.messaging();

// 1. N8n se Data aate hi Notification khud Draw karo
messaging.onBackgroundMessage(function(payload) {
    console.log("Data received in background", payload);
    
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        image: payload.data.image,
        data: {
            url: payload.data.link // Link yahan save ho jayega
        }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 2. Click hote hi jabardasti naya tab open karo
self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Notification screen se hatao
    
    const urlToOpen = event.notification.data.url;

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            // Agar browser pehle se khula hai toh usme open karo
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Warna naya tab open karo
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
