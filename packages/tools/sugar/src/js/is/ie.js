function isIe(ua = navigator.userAgent) {
  return ua.indexOf("MSIE") > -1;
}
var ie_default = isIe;
export {
  ie_default as default
};
