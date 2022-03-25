function isUcBrowser(ua = navigator.userAgent) {
  return ua.match(/UCBrowser/i) !== null;
}
var ucBrowser_default = isUcBrowser;
export {
  ucBrowser_default as default
};
