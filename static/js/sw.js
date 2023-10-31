const buildFiles = [
  '/app.js',
  '/index.html',
  '/manifest.json',
  '/src/css/ar-vr.css',
  '/src/css/audio-recording.css',
  '/src/css/authentication.css',
  '/src/css/barcode.css',
  '/src/css/bluetooth.css',
  '/src/css/contacts.css',
  '/src/css/face-detection.css',
  '/src/css/file-system.css',
  '/src/css/fonts.css',
  '/src/css/geolocation.css',
  '/src/css/home.css',
  '/src/css/main.css',
  '/src/css/media.css',
  '/src/css/network-info.css',
  '/src/css/nfc.css',
  '/src/css/pagelifecycle.css',
  '/src/css/payment.css',
  '/src/css/prism.css',
  '/src/css/speech-recognition.css',
  '/src/css/styles.css',
  '/src/css/transitions.css',
  '/src/css/vibration.css',
  '/src/css/web-share.css',
  '/src/elements/_file-tree.js',
  '/src/elements/barcode-reader.js',
  '/src/elements/code-snippet.js',
  '/src/elements/context-menu.js',
  '/src/elements/device-motion.js',
  '/src/elements/device-orientation.js',
  '/src/elements/face-detector.js',
  '/src/elements/file-tree.js',
  '/src/elements/google-map.js',
  '/src/elements/iterateWorker.js',
  '/src/elements/multi-touch.js',
  '/src/elements/network-information.js',
  '/src/elements/on-outside-click.js',
  '/src/elements/saveFileWorker.js',
  '/src/elements/shape-detector.js',
  '/src/elements/speech-recognition.js',
  '/src/elements/speech-synthesis.js',
  '/src/elements/web-cam.js',
  '/src/templates/ar-vr.js',
  '/src/templates/audio-recording.js',
  '/src/templates/audio.js',
  '/src/templates/authentication.js',
  '/src/templates/background-sync.js',
  '/src/templates/barcode.js',
  '/src/templates/bluetooth.js',
  '/src/templates/contacts.js',
  '/src/templates/device-motion.js',
  '/src/templates/device-orientation.js',
  '/src/templates/face-detection.js',
  '/src/templates/file-system.js',
  '/src/templates/geolocation.js',
  '/src/templates/home.js',
  '/src/templates/info.js',
  '/src/templates/media.js',
  '/src/templates/multi-touch.js',
  '/src/templates/network-info.js',
  '/src/templates/nfc.js',
  '/src/templates/notifications.js',
  '/src/templates/page-lifecycle.js',
  '/src/templates/payment.js',
  '/src/templates/screen-orientation.js',
  '/src/templates/sensor-sheet.js',
  '/src/templates/share-target.js',
  '/src/templates/speech-recognition.js',
  '/src/templates/speech-synthesis.js',
  '/src/templates/vibration.js',
  '/src/templates/wake-lock.js',
  '/src/templates/web-share.js',];

const staticFiles = [
  '/src/fonts/ionicons.svg',
  '/src/fonts/ionicons.woff',
  '/src/fonts/MaterialIcons-Regular.woff',
  '/src/fonts/material-icons.woff2',
  '/src/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/src/img/crate.gif',
  '/src/img/pwalogo.png',
  '/src/img/pwalogo.svg',
  '/src/img/robot.png',
  '/src/img/ios-install.png',
  '/src/img/ios-install.webp',
  '/src/img/ios-share.png',
  '/src/img/ios-share.webp',
  '/src/img/sensors-step1.jpg',
  '/src/img/sensors-step2.jpg',
  '/src/img/sensors-step3.jpg',
  '/src/img/sensors-step4.jpg',
  '/src/img/sensors-step5.jpg',
  '/src/img/sensors-ios-step1.png',
  '/src/img/sensors-ios-step2.png',
  '/src/img/sensors-step1.webp',
  '/src/img/sensors-step2.webp',
  '/src/img/sensors-step3.webp',
  '/src/img/sensors-step4.webp',
  '/src/img/sensors-step5.webp',
  '/src/img/sensors-ios-step1.webp',
  '/src/img/sensors-ios-step2.webp',
  '/src/img/icons/favicon-32.png',
  '/src/img/icons/icon-144x144.png',
  '/src/img/icons/icon-152x152.png',
  '/src/img/icons/icon-167x167.png',
  '/src/img/icons/icon-180x180.png',
  '/src/img/icons/icon-192x192.png',
  '/src/img/icons/icon-512x512.png',
  '/src/img/icons/icon-600x600.png',
  '/src/img/media/mirror-conspiracy256x256.jpeg',
  '/src/img/media/mirror-conspiracy512x512.jpeg',
  '/src/img/icons/mediacapture-192x192.png',
  '/src/img/icons/geolocation-192x192.png',
  '/src/img/icons/authentication-192x192.png',
  '/src/img/icons/info-192x192.png',
  '/src/img/screenshots/shot1.png',
  '/src/img/screenshots/shot2.png',
  '/src/img/screenshots/shot3.png',
  '/src/img/screenshots/shot4.png',
  '/src/img/screenshots/shot5.png',
  '/src/img/screenshots/shot6.png',
  '/src/img/screenshots/shot7.png',
  '/src/img/screenshots/shot8.png',
  '/src/img/screenshots/shot9.png',
  '@dannymoerkerke/audio-recorder/dist/audio-recorder.js',
  '@dannymoerkerke/custom-element/dist/custom-element.es.js',
  '@dannymoerkerke/material-webcomponents/src/material-app-bar.js',
  '@dannymoerkerke/material-webcomponents/src/material-bottom-sheet.js',
  '@dannymoerkerke/material-webcomponents/src/material-button.js',
  '@dannymoerkerke/material-webcomponents/src/material-checkbox.js',
  '@dannymoerkerke/material-webcomponents/src/material-dialog.js',
  '@dannymoerkerke/material-webcomponents/src/material-dropdown.js',
  '@dannymoerkerke/material-webcomponents/src/material-loader.js',
  '@dannymoerkerke/material-webcomponents/src/material-progress.js',
  '@dannymoerkerke/material-webcomponents/src/material-radiobutton-group.js',
  '@dannymoerkerke/material-webcomponents/src/material-radiobutton.js',
  '@dannymoerkerke/material-webcomponents/src/material-switch.js',
  '@dannymoerkerke/material-webcomponents/src/material-textfield.js',
  'three/build/three.module.js',
  // 'https://www.googletagmanager.com/gtag/js/?id=G-VTKNPJ5HVC'

];

const routes = [
  '/',
  '/media',
  '/audio',
  '/audio-recording',
  '/geolocation',
  '/device-orientation',
  '/device-motion',
  '/web-share',
  '/share-target',
  '/multi-touch',
  '/speech-synthesis',
  '/speech-recognition',
  '/page-lifecycle',
  '/notifications',
  '/screen-orientation',
  '/bluetooth',
  '/network-info',
  '/contacts',
  '/ar-vr',
  '/info',
  '/payment',
  '/authentication',
  '/wake-lock',
  '/vibration',
  '/nfc',
  '/file-system',
  '/barcode',
  '/face-detection',
  '/background-sync'
];

const filesToCache = [
  ...buildFiles,
  ...staticFiles,
  ...routes
];

self.numBadges = 0;
const version = 366;

const cacheName = `pwa-cache-${version}`;

const debug = true;

const log = debug ? console.log.bind(console) : () => {
};

const IDBConfig = {
  name: 'pwa-db',
  version,
  store: {
    name: `pwa-store`,
    keyPath: 'timestamp'
  }
};

const createIndexedDB = ({name, store}) => {
  const request = self.indexedDB.open(name, 1);

  return new Promise((resolve, reject) => {
    request.onupgradeneeded = e => {
      const db = e.target.result;

      if(!db.objectStoreNames.contains(store.name)) {
        db.createObjectStore(store.name, {keyPath: store.keyPath});
        log('create objectstore', store.name);
      }

      [...db.objectStoreNames].filter((name) => name !== store.name).forEach((name) => db.deleteObjectStore(name));
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

const getStoreFactory = (dbName) => ({name}, mode = 'readonly') => {
  return new Promise((resolve, reject) => {

    const request = self.indexedDB.open(dbName, 1);

    request.onsuccess = e => {
      const db = request.result;
      const transaction = db.transaction(name, mode);
      const store = transaction.objectStore(name);

      return resolve(store);
    };

    request.onerror = e => reject(request.error);
  });
};

const openStore = getStoreFactory(IDBConfig.name);

const getCacheStorageNames = async () => {
  const cacheNames = await caches.keys() || [];
  const outdatedCacheNames = cacheNames.filter(name => !name.includes(cacheName));
  const latestCacheName = cacheNames.find(name => name.includes(cacheName));

  return {latestCacheName, outdatedCacheNames};
};

const prepareCachesForUpdate = async () => {
  const {latestCacheName, outdatedCacheNames} = await getCacheStorageNames();
  if(!latestCacheName || !outdatedCacheNames?.length) {
    return null;
  }

  const latestCache = await caches?.open(latestCacheName);
  const latestCacheKeys = (await latestCache?.keys())?.map(c => c.url) || [];
  const latestCacheMainKey = latestCacheKeys?.find(url => url.includes('/index.html'));
  const latestCacheMainKeyResponse = latestCacheMainKey ? await latestCache.match(latestCacheMainKey) : null;

  const latestCacheOtherKeys = latestCacheKeys.filter(url => url !== latestCacheMainKey) || [];

  const cachePromises = outdatedCacheNames.map(cacheName => {
    const getCacheDone = async () => {
      const cache = await caches?.open(cacheName);
      const cacheKeys = (await cache?.keys())?.map(c => c.url) || [];
      const cacheMainKey = cacheKeys?.find(url => url.includes('/index.html'));

      if(cacheMainKey && latestCacheMainKeyResponse) {
        await cache.put(cacheMainKey, latestCacheMainKeyResponse.clone());
      }

      return Promise.all(
        latestCacheOtherKeys
        .filter(key => !cacheKeys.includes(key))
        .map(url => cache.add(url).catch(r => console.error(r))),
      );
    };
    return getCacheDone();
  });

  return Promise.all(cachePromises);
};

const installHandler = e => {
  e.waitUntil(
    self.clients.matchAll({
      includeUncontrolled: true,
    })
    .then(clients => {
      caches.open(cacheName)
      .then(cache => cache.addAll(filesToCache.map(file => new Request(file, {cache: 'no-cache'}))))
    })
  );
};

const activateHandler = e => {
  // log('[ServiceWorker] Activate');
  // sendMessage({msg: 'activate'});

  e.waitUntil(
    caches.keys()
    .then(names => Promise.all(
      names
      .filter(name => name !== cacheName)
      .map(name => caches.delete(name))
    ))
  );
};

const returnRangeRequest = request => fetch(request)
.then(res => res.arrayBuffer())
.then(arrayBuffer => {
  const bytes = /^bytes=(\d+)-(\d+)?$/g.exec(request.headers.get('range'));

  if(bytes) {
    const start = Number(bytes[1]);
    const end = Number(bytes[2]) || arrayBuffer.byteLength - 1;

    return new Response(arrayBuffer.slice(start, end + 1), {
      status: 206,
      statusText: 'Partial Content',
      headers: [
        ['Content-Range', `bytes ${start}-${end}/${arrayBuffer.byteLength}`]
      ]
    });
  }

  return new Response(null, {
    status: 416,
    statusText: 'Range Not Satisfiable',
    headers: [['Content-Range', `*/${arrayBuffer.byteLength}`]]
  });

});

const fetchHandler = async e => {
  const {request} = e;
  const {url} = request;

  // log('[Service Worker] Fetch', url, request.method);

  e.respondWith(
    caches.match(e.request, {ignoreSearch: true})
    .then(response => {
      if(response) {
        // log('from cache', url);
        // sendMessage({msg: `from cache: ${url}`});

        return response;
      }

      if(url.includes('.woff')) {
        const fontOrigin = new URL(url).origin;
        const origin = new URL(location.href).origin;

        if(fontOrigin !== origin) {
          const fontName = url.split('/').pop();
          const localFontUrl = `${origin}/src/fonts/${fontName}`;
          const fontRequest = new Request(localFontUrl);

          return caches.match(fontRequest)
          .then(response => {
            if(response) {
              return response
            }
            return fetch(fontRequest);
          });
        }
      }
      // log('fetch', url);
      // sendMessage({msg: `fetch: ${url}`});

      return fetch(e.request);
    })
    .catch(err => console.error('fetch error:', err, url))
  );

};

const getClients = async () => await self.clients.matchAll({
  includeUncontrolled: true,
});

const hasActiveClients = async () => {
  const clients = await getClients();

  return clients.some(({visibilityState}) => visibilityState === 'visible');
};

const sendMessage = async message => {
  const clients = await getClients();

  clients.forEach((client) => client.postMessage({type: 'message', message}));
}

const pushHandler = async e => {
  const data = e.data.json();
  const {title, message, interaction} = data;

  const options = {
    body: message,
    icon: '/src/img/icons/icon-512x512.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now()
    },
    actions: [
      {
        action: 'confirm',
        title: 'OK'
      },
      {
        action: 'close',
        title: 'Close notification'
      },
    ],
    requireInteraction: interaction
  };

  e.waitUntil(
    self.registration.showNotification(title, options)
    .then(hasActiveClients)
    .then((activeClients) => {
      if(!activeClients) {
        console.log('set badge');
        self.numBadges += 1;
        navigator.setAppBadge(self.numBadges);

        sendMessage(`badges: ${self.numBadges}`);
      }
      else {
        sendMessage('no badge');
      }
    })
    .catch(err => sendMessage(err))
  )
};

const messageHandler = async ({data}) => {
  console.log('message', data);

  const {type} = data;

  switch(type) {
    case 'clearBadges':
      self.numBadges = 0;
      if('clearAppBadge' in navigator) {
        navigator.clearAppBadge();
      }

      // sendMessage(`clear badges`);
      break;

    case 'SKIP_WAITING':
      const clients = await self.clients.matchAll({
        includeUncontrolled: true,
      });

      if(clients.length < 2) {
        self.skipWaiting();
      }

      break;

    case 'PREPARE_CACHES_FOR_UPDATE':
      await prepareCachesForUpdate();

      break;
  }
}

const syncHandler = async e => {
  console.log('sync');
  const title = 'Background Sync demo';
  const message = 'Background Sync demo message';

  if(e.tag.startsWith('sync-demo')) {
    const options = {
      body: message,
      icon: '/src/img/icons/icon-512x512.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now()
      },
      actions: [
        {
          action: 'confirm',
          title: 'OK'
        },
        {
          action: 'close',
          title: 'Close notification'
        },
      ]
    };

      let idbStore;
    const getNotifications = () => new Promise((resolve, reject) => {
      openStore(IDBConfig.store, 'readwrite')
      .then((store) => {
        idbStore = store;
        const request = idbStore.getAll();

        request.onsuccess = e => {
          const {result} = request;

          return resolve(result);
        };

        request.onerror = e => reject(e);
      })
    });

    e.waitUntil(
      getNotifications()
      .then((notifications) => {
        console.log(notifications);
        const requests = notifications.map(({message}) => {
          options.body = message;
          return self.registration.showNotification(title, options);
        });

        return Promise.all(requests)
        .then(() => openStore(IDBConfig.store, 'readwrite'))
        .then(idbStore => idbStore.clear());
      })
    )
  }
};

const notificationClickHandler = async e => {
  console.log('notification click', e.notification.tag);
  e.notification.close();
};

self.addEventListener('notificationclick', notificationClickHandler)
self.addEventListener('sync', syncHandler);
self.addEventListener('install', installHandler);
self.addEventListener('activate', activateHandler);
self.addEventListener('fetch', fetchHandler);
self.addEventListener('push', pushHandler);
self.addEventListener('message', messageHandler);