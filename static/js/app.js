import {isIOS, isOffline} from './util-device.js';


// installation handle
const handleInstallPrompt = e => {
  e.preventDefault();
  window.deferredPrompt = e;
};
window.addEventListener('beforeinstallprompt', handleInstallPrompt);


// Network status handling
export const handleOffline = () => {
  document.querySelectorAll('.network-status').forEach(el => el.classList.add('offline'));
};

export const handleOnline = () => {
  document.querySelectorAll('.network-status').forEach(el => el.classList.remove('offline'));
};

window.addEventListener('offline', handleOffline);
window.addEventListener('online', handleOnline);

window.addEventListener('load', () => {
  if(isOffline()) {
    handleOffline();
  }
});


// Badges red dot remove on focus
document.addEventListener('visibilitychange', () => {
  console.log('visibilitychange', document.visibilityState);
  if(document.visibilityState === 'visible' && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({type: 'clearBadges'});
  }
});


// function to print message from service worker
navigator.serviceWorker.addEventListener("message", (event) => {
  const {type} = event.data;

  switch(type) {
    case 'message':
      console.log('message from sw', event.data.message);

      break;
  }
});


// Get Devie pixels
const ratio = window.devicePixelRatio || 1;
const screen = {
  width: window.screen.width * ratio,
  height: window.screen.height * ratio
};

if(isIOS() && screen.width === 1242 && screen.height === 2688) {
  const meta = document.querySelector('meta[name="viewport"]');
  const content = meta.getAttribute('content');

  meta.setAttribute('content', `${content}, viewport-fit=cover`);
}

const main = document.querySelector('main');

if(main) {
  main.addEventListener('touchmove', (e) => {
    const el = e.composedPath().find((element) => element.tagName && (element.matches('.cm-nav') || element.matches('.cm-mobnav')));

    if(el) {
      e.preventDefault();
    }
  });
}

// const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");
const themeColorMetaTag = document.querySelector('meta[name="theme-color"]');
// // themeColorMetaTag.content = darkModePreference.matches ? '#696969' : '#ffffff';
// darkModePreference.addEventListener('change', (e) => {
//   const darkMode = e.matches;

//   themeColorMetaTag.content = darkMode? '#696969' : '#ffffff';
// });