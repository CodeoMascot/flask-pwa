const statusSpan = document.querySelector('#notifyContent span.status')

statusSpan.innerHTML = "<br>JS: Works";


const subscribeButton = document.querySelector('#subscribe');
const unsubscribeButton = document.querySelector('#unsubscribe');
const notifyButton = document.querySelector('#notify');
const pushApiButton = document.querySelector('#pushApi');


const notificationSupported = 'Notification' in window;
statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Notification Supported: ${notificationSupported}`);


const dummyNotification = {
    'title': 'Did you forgot to checked out?',
    'options': {
        'body': 'Click here to chekout your last check-in?',
        'dir': 'ltr',
        'icon': 'https://codeomascot.github.io/pwa1/icons/manifest-icon-192.maskable.png',
        'badge': 'https://codeomascot.github.io/pwa1/icons/safari-pinned-tab.svg',
        'vibrate': [200, 100, 200],

        'actions': [
            {
                'action': 'checkout-action',
                'type': 'button',
                'title': 'Checkout'
            },
            {
                'action': 'dismiss-action',
                'type': 'button',
                'title': 'Dismiss'
            },
        ]
    }
}

// notify Permission
subscribeButton.addEventListener('click', async () => {
    if (Notification.permission === 'granted') {
        statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Notify Permission: Already Granted`);
        subscribeButton.disabled = true;
        notifyButton.disabled = false;

    }
    else if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
            statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Notify Permission: Granted`);

            subscribeButton.disabled = true;
            notifyButton.disabled = false;
        }
        else {
            statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Notify Permission: Denied`);

            subscribeButton.disabled = true;
            notifyButton.disabled = true;
        }
    }
    else {
        statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Notify Permission: Already Denied`);

        subscribeButton.disabled = true;
        notifyButton.disabled = true;

    }

});


notifyButton.addEventListener('click', async () => {
    const registration = await navigator.serviceWorker.getRegistration();

    if ('showNotification' in registration) {
        registration.showNotification(dummyNotification.title, dummyNotification.options);
    }
    else {
        new Notification(dummyNotification.title, dummyNotification.options);
    }

    /*
    notification.onclick = function () {
      window.open('https://www.google.com');
    };
    */
});




// SW Check
const serviceWorkerAvailable = "serviceWorker" in navigator
statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Service Worker Available: ${serviceWorkerAvailable}`);


// Get Push API
pushApiButton.addEventListener('click', async () => {
    // This API key belongs to PWA Today
    //   const apiUrl = 'https://yourserver.com/api_v1.0/';
    //   const response = await (await fetch(`${apiUrl}/public-key`)).json();
    //   const publicKey = response.publicKey;
    const publicKey = 'BGByiWdMxciiNJkqcAzGoZpS4JHmhKZsjWXNvte52AqXd_8ACgNL2iFG6L-VLEq3vleg2bM8MuW7Hb3P85cA_Qo';

    const registration = await navigator.serviceWorker.getRegistration();

    await subscribeToPushMessages(registration, publicKey);

    const pushSubscription = await registration.pushManager.getSubscription();

    if (pushSubscription) {
        statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Push API Endpoint: ${pushSubscription.endpoint}`);
        unsubscribeButton.disabled = false;
        pushApiButton.disabled = true;

    }
    else {
        statusSpan.innerHTML = (`${statusSpan.innerHTML}<br><br>Push: Null`);
        unsubscribeButton.disabled = true;
        pushApiButton.disabled = true;
    }
});

const base64UrlToUint8Array = base64UrlData => {
    const padding = '='.repeat((4 - base64UrlData.length % 4) % 4);
    const base64 = (base64UrlData + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const buffer = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        buffer[i] = rawData.charCodeAt(i);
    }

    return buffer;
};

const subscribeToPushMessages = (registration, publicKey) => registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: base64UrlToUint8Array(publicKey)
});

unsubscribeButton.addEventListener('click', async () => {
    const registration = await navigator.serviceWorker.getRegistration();

    const pushSubscription = await registration.pushManager.getSubscription();;

    try {
        const success = await pushSubscription.unsubscribe();

        if (success) {
            console.log('successfully unsubscribed');

            pushApiButton.disabled = false;
            unsubscribeButton.disabled = true;
        }
        else {
            console.log('unsubscribing was not successful');
        }
    }
    catch (err) {
        console.log('error unsubscribing', err);
    }
});



// @todo: implement push to server
const apiUrl = 'https://ca9akfgcre.execute-api.us-east-1.amazonaws.com';
const sendPushMessage = async ({ title, message, delay, interaction }) => {
    const pushSubscription = await getPushSubscription();
    console.log('sending');
    fetch(`${apiUrl}/send-message`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pushSubscription,
            title,
            message,
            delay: delay * 1000,
            interaction
        })
    });
};

// notifyButton.addEventListener('click', () => {
//     const title = 'Title1';
//     const message = 'message1';
//     const delay = 0;
//     const interaction = True;

//     sendPushMessage({ title, message, delay, interaction });
// });

