function isFirefox(ua = navigator.userAgent) {
  return ua.indexOf("Firefox") > -1;
}
var firefox_default = isFirefox;
export {
  firefox_default as default
};
