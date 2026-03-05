self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    let urlToOpen = "https://www.earthinsider.in";
    if (event.notification.data && event.notification.data.FCM_MSG && event.notification.data.FCM_MSG.notification && event.notification.data.FCM_MSG.notification.click_action) {
        urlToOpen = event.notification.data.FCM_MSG.notification.click_action;
    } else if (event.notification.click_action) {
        urlToOpen = event.notification.click_action;
    }

    event.waitUntil(
        clients.openWindow(urlToOpen)
    );
});
