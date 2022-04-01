import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function isChrome(ua = navigator.userAgent) {
  return ua.indexOf("Chrome") > -1;
}
var chrome_default = isChrome;
export {
  chrome_default as default
};
