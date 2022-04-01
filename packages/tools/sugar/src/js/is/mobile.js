import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import MobileDetect from "mobile-detect";
function isMobile(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.mobile() !== null;
}
var mobile_default = isMobile;
export {
  mobile_default as default
};
