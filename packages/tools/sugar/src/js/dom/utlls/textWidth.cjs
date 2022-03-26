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
var textWidth_exports = {};
__export(textWidth_exports, {
  default: () => textWidth_default
});
module.exports = __toCommonJS(textWidth_exports);
var import_getStyleProperty = __toESM(require("../style/getStyleProperty"), 1);
function textWidth(source) {
  const elm = document.createElement("span");
  elm.style.whiteSpace = "nowrap";
  elm.style.position = "absolute";
  elm.style.visibility = "hidden";
  let text = source;
  if (source.tagName) {
    const tagName = source.tagName.toLowerCase();
    switch (tagName) {
      case "input":
      case "textarea":
        text = source.value;
        break;
      default:
        text = source.innerText;
        break;
    }
    const fs = (0, import_getStyleProperty.default)(source, "font-size");
    const ff = (0, import_getStyleProperty.default)(source, "font-family");
    const ls = (0, import_getStyleProperty.default)(source, "letter-spacing");
    elm.style.fontSize = fs;
    elm.style.fontFamily = ff;
    elm.style.letterSpacing = ls;
  }
  text = text.replace(/ /g, "\xA0");
  elm.innerHTML = text;
  document.body.appendChild(elm);
  const width = elm.offsetWidth;
  document.body.removeChild(elm);
  return width;
}
var textWidth_default = textWidth;
