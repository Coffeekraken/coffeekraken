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
var px2em_exports = {};
__export(px2em_exports, {
  default: () => px2em_default
});
module.exports = __toCommonJS(px2em_exports);
function px2em(px, $elm = document.documentElement) {
  return px / parseFloat(getComputedStyle($elm).fontSize || "16px");
}
var px2em_default = px2em;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
