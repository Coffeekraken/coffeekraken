function isSamsumgBrowser(ua = navigator.userAgent) {
  return ua.match(/SamsungBrowser/i) !== null;
}
var samsungBrowser_default = isSamsumgBrowser;
export {
  samsungBrowser_default as default
};
