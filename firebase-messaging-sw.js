importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDf3nXOyLE0Z5vfCNLvHI3A_U8PsVXG3jE",
    projectId: "n8n-notification-push",
    messagingSenderId: "472906773403",
    appId: "1:472906773403:web:d08f0b6b3991790c64673e"
});

const messaging = firebase.messaging();

// The Bulletproof Click Handler
self.addEventListener('notificationclick', function(event) {
    // 1. Notification ko turant close karo
    event.notification.close();
    
    // 2. N8n ne jo secret "url" data bheja hai, usko nikalo
    let urlToOpen = "https://www.earthinsider.in"; // Default link
    if (event.notification.data && event.notification.data.url) {
        urlToOpen = event.notification.data.url;
    }

    // 3. Browser ko force karo ki naya tab open kare
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(windowClients) {
            // Agar article pehle se kisi tab mein khula hai, toh wahan le jao
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // Warna 100% naya tab open karo
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
