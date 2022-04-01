import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var visible_exports = {};
__export(visible_exports, {
  default: () => visible_default
});
module.exports = __toCommonJS(visible_exports);
function visible(elm) {
  if (elm.nodeName.toLowerCase() === "script")
    return true;
  const style = window.getComputedStyle(elm, null), opacity = style["opacity"], visibility = style["visibility"], display = style["display"];
  return opacity !== "0" && display !== "none" && visibility !== "hidden";
}
window.__visible = visible;
var visible_default = visible;
