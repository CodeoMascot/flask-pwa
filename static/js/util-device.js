export const getBrowser = () => {
    const {userAgent} = navigator;
  
    return userAgent.match(/chrome|chromium|crios/i) ? 'chrome' :
      userAgent.match(/firefox|fxios/i) ? 'firefox' :
      userAgent.match(/safari/i) ? 'safari' :
      userAgent.match(/opr\//i) ? 'opera' :
      userAgent.match(/edg/i) ? 'edge' :
      userAgent.match(/android/i) ? 'android' :
      userAgent.match(/iphone/i) ? 'iphone' : 'unknown';
  }
  export const isTouchScreen = () => {
    return navigator.maxTouchPoints && navigator.maxTouchPoints > 0 ||
      window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches;
  };
  export const isOffline = () => 'onLine' in navigator && !navigator.onLine;
  
  export const isIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  export const isAndroid = () => /android/i.test(navigator.userAgent);
  
  export const isChrome = () => getBrowser() === 'chrome';
  export const isFirefox = () => getBrowser() === 'firefox';
  export const isSafari = () => getBrowser() ==='safari';
  export const isOpera = () => getBrowser() === 'opera';
  export const isEdge = () => getBrowser() === 'edge';
  export const isIOSSafari = () => getBrowser() ==='safari' && isIOS();
  export const isIOSChrome = () => getBrowser() === 'chrome' && isIOS();
  export const isAndroidChrome = () => getBrowser() === 'chrome' && isAndroid();
  export const isIOSFirefox = () => getBrowser() === 'firefox' && isIOS();
  export const isAndroidFirefox = () => getBrowser() === 'firefox' && isAndroid();
  export const isIOSEdge = () => getBrowser() === 'edge' && isIOS();
  export const isAndroidEdge = () => getBrowser() === 'edge' && isAndroid();
  export const isIOSOpera = () => getBrowser() === 'opera' && isIOS();
  export const isAndroidOpera = () => getBrowser() === 'opera' && isAndroid();
  
  
  
  