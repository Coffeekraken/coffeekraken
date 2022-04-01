import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
import MobileDetect from "mobile-detect";
function isTablet(ua = navigator.userAgent) {
  const md = new MobileDetect(ua);
  return md.tablet() !== null;
}
var tablet_default = isTablet;
export {
  tablet_default as default
};
