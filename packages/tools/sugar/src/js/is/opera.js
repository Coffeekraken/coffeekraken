import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function isOpera(ua = navigator.userAgent) {
  return ua.toLowerCase().indexOf("op") > -1;
}
var opera_default = isOpera;
export {
  opera_default as default
};
