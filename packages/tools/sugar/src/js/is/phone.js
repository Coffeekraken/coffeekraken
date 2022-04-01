import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import MobileDetect from "mobile-detect";
function isPhone(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.phone() !== null;
}
var phone_default = isPhone;
export {
  phone_default as default
};
