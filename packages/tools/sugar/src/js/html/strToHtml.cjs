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
var strToHtml_exports = {};
__export(strToHtml_exports, {
  default: () => strToHtml_default
});
module.exports = __toCommonJS(strToHtml_exports);
function strToHtml(string) {
  if (document !== void 0 && document.createElement !== void 0) {
    const cont = document.createElement("div");
    cont.innerHTML = string;
    if (cont.children.length === 1) {
      return cont.children[0];
    } else {
      return cont;
    }
  }
  return string;
}
var strToHtml_default = strToHtml;
