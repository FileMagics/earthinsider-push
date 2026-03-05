importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDf3nXOyLE0Z5vfCNLvHI3A_U8PsVXG3jE",
    projectId: "n8n-notification-push",
    messagingSenderId: "472906773403",
    appId: "1:472906773403:web:d08f0b6b3991790c64673e"
});

const messaging = firebase.messaging();

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    let targetUrl = "https://www.earthinsider.in";
    
    if (event.notification.data && event.notification.data.link) {
        targetUrl = event.notification.data.link;
    } else if (event.notification?.fcmOptions?.link) {
        targetUrl = event.notification.fcmOptions.link;
    }

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
            for (let i = 0; i < clientList.length; i++) {
                let client = clientList[i];
                if (client.url.includes(targetUrl) && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
