var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var injectStyle_exports = {};
__export(injectStyle_exports, {
  default: () => injectStyle_default
});
module.exports = __toCommonJS(injectStyle_exports);
var import_uniqid = __toESM(require("../../../shared/string/uniqid"));
function injectStyle(style, id = `injected-style-${(0, import_uniqid.default)()}`, node = document.head) {
  if (document.querySelector(`#${id}`))
    return;
  const $tag = document.createElement("style");
  $tag.type = "text/css";
  $tag.setAttribute("id", `injected-style-${id.toLowerCase()}`);
  $tag.innerHTML = style;
  node.appendChild($tag);
  return $tag;
}
var injectStyle_default = injectStyle;
