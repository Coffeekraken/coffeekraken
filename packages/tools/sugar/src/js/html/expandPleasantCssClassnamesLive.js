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
import __querySelectorLive from "../dom/query/querySelectorLive";
import __expandPleasantCssClassname from "../../shared/html/expandPleasantCssClassname";
function expandPleasantCssClassnamesLive(settings) {
  settings = __spreadValues({
    rootNode: document
  }, settings);
  __querySelectorLive('[class*=":"]:not(code [class*=":"]):not(template [class*=":"]),[class*="@"]:not(code [class*="@"]):not(template [class*="@"])', ($elm) => {
    const classesStr = $elm.getAttribute("class");
    const newClassesStr = __expandPleasantCssClassname(classesStr);
    $elm.setAttribute("class", newClassesStr);
  }, {
    rootNode: settings == null ? void 0 : settings.rootNode,
    once: false
  });
}
export {
  expandPleasantCssClassnamesLive as default
};
