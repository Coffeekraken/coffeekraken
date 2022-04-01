import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import whenInViewport from "../dom/whenInViewport";
import querySelectorLive from "../dom/querySelectorLive";
function videoLazySrcAttribute(settings = {}) {
  settings = __spreadValues({
    offset: 50
  }, settings);
  querySelectorLive("video[lazy-src]:not([is])", ($videoElm) => {
    whenInViewport($videoElm, settings.offset).then(() => {
      $videoElm.setAttribute("src", $videoElm.getAttribute("lazy-src"));
    });
  });
}
var videosLazySrcAttribute_default = videoLazySrcAttribute;
export {
  videosLazySrcAttribute_default as default
};
