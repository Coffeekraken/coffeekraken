import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
function isIe(ua = navigator.userAgent) {
  return ua.indexOf("MSIE") > -1;
}
var ie_default = isIe;
export {
  ie_default as default
};
