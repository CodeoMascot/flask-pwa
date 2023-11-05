const filesToCache = [
  '/offline',
  '/static/manifest.json',

  'https://codeomascot.github.io/pwa1/icons/manifest-icon-192.maskable.png',
  'https://codeomascot.github.io/pwa1/icons/manifest-icon-512.maskable.png',
  'https://codeomascot.github.io/pwa1/icons/favicon-32x32.png',
  'https://codeomascot.github.io/pwa1/icons/safari-pinned-tab.svg',
  
  '/static/css/my.css',
  '/static/css/bootstrap@5.2.3.min.css',
  '/static/css/bootstrap-icons@1.11.1.css',
  '/static/css/fonts/bootstrap-icons.woff2?2820a3852bdb9a5832199cc61cec4e65',
  
  '/static/js/my.js',
  '/static/js/app.js',
  '/static/js/pwa-notifications.js',
  '/static/js/bootstrap@5.3.2.min.js',
  '/static/js/popperjs.core@2.11.8.min.js',
  '/static/js/util-device.js',
  
  'https://avatars.githubusercontent.com/u/109819789'
];

self.numBadges = 0;
const version = 4;

const cacheName = `cm-pwa-cache-${version}`;


const debug = true;

const log = debug ? console.log.bind(console) : () => {
};

const IDBConfig = {
  name: 'cm-pwa-db',
  version,
  store: {
    name: `cm-pwa-store`,
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

const fetchHandler = async (e) => {
  // updated with code to show an offline page and offline image

  const {request} = e; // same as, e.request
  const {url} = request; // same as request.url

  // log('[Service Worker] Fetch', url, request.method);

  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) {
      //console.log(`[SW] Resource in Cache`);
      return r;
    }

    try {
      console.log(`[SW] Resource NOT in Cache ${e.request.url}`);

      const response = await fetch(e.request);

      // We could cache this new resource if we wanted to.
      // const cache = await caches.open(cacheName);
      // console.log(`[SW] Caching new resource: ${e.request.url}`);
      // cache.put(e.request, response.clone());
      return response;
    } catch(error) {
      console.log('[SW] NW Fetch failed; returning offline page instead.', error);
      // In reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
      let url = e.request.url;
      let extension = url.split('.').pop();
      console.log('URL: ', url);

      if (extension === 'jpg' || extension === 'png' || extension === 'webp') {
          const FALLBACK_IMAGE = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="180" stroke-linejoin="round">
            <path stroke="#DDD" stroke-width="25" d="M99,18 15,162H183z"/>
            <path stroke-width="17" fill="#FFF" d="M99,18 15,162H183z" stroke="#eee"/>
            <path d="M91,70a9,9 0 0,1 18,0l-5,50a4,4 0 0,1-8,0z" fill="#aaa"/>
            <circle cy="138" r="9" cx="100" fill="#aaa"/>
            </svg>`;
          // const FALLBACK_IMAGE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path class="heroicon-ui" d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2zm16 8.59V6H4v6.59l4.3-4.3a1 1 0 0 1 1.4 0l5.3 5.3 2.3-2.3a1 1 0 0 1 1.4 0l1.3 1.3zm0 2.82l-2-2-2.3 2.3a1 1 0 0 1-1.4 0L9 10.4l-5 5V18h16v-2.59zM15 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>`;
          return Promise.resolve(new Response(FALLBACK_IMAGE, {
              headers: {
                  'Content-Type': 'image/svg+xml'
              }
          }));
      }
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match('offline');
      return cachedResponse;
    }
  })());
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