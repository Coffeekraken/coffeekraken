import "../../../../../chunk-PG3ZPS4G.mjs";
import MobileDetect from "mobile-detect";
function isMobile(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.mobile() !== null;
}
var mobile_default = isMobile;
export {
  mobile_default as default
};
