import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function isSafari(ua = navigator.userAgent) {
  return ua.indexOf("Safari") != -1 && ua.indexOf("Chrome") == -1;
}
var safari_default = isSafari;
export {
  safari_default as default
};
