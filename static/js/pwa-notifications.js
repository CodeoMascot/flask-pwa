const notificationSupported = 'Notification' in window;

const notifyContent = document.querySelector('#notifyContent');

const notification = document.querySelector('#notification');

const sendButton = document.querySelector('#send');
const subscribeButton = document.querySelector('#subscribe');
const unsubscribeButton = document.querySelector('#unsubscribe');

const registration = await navigator.serviceWorker.getRegistration();

if (notificationSupported) {
    notifyContent.classList.remove('d-none');
    document.querySelector('#notifyContent p span').innerHTML(notificationSupported);
} else {
    subscribeButton.toggleAttribute('disabled');
    unsubscribeButton.toggleAttribute('disabled');
    sendButton.toggleAttribute('disabled');
}



const sendNotification = async () => {
    if (Notification.permission === 'granted') {
        showNotification(notification.value);
    }
    else {
        if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();

            if (permission === 'granted') {
                showNotification(notification.value);
            }
        }
    }
};

const showNotification = body => {
    const title = 'CM PWA Title';

    const payload = {
        body
    };

    if ('showNotification' in registration) {
        registration.showNotification(title, payload);
    }
    else {
        new Notification(title, payload);
    }
};

sendButton.addEventListener('click', sendNotification);