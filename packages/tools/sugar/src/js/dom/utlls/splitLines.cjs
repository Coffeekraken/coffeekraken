var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var splitLines_exports = {};
__export(splitLines_exports, {
  default: () => splitLines_default
});
module.exports = __toCommonJS(splitLines_exports);
var import_map = __toESM(require("lodash/map"));
var import_throttle = __toESM(require("../../shared/function/throttle"));
function splitLines(elm, settings = {}) {
  settings = __spreadValues({
    tag: "p",
    class: "split-lines"
  }, settings);
  window.addEventListener("resize", (0, import_throttle.default)((e) => {
    _splitLines(elm, settings);
  }, 150));
  _splitLines(elm, settings);
  return elm;
}
function _splitLines(elm, settings) {
  let string = elm._splitLinesOriginalString;
  if (!string) {
    string = elm.innerHTML;
    elm._splitLinesOriginalString = string;
  }
  elm.classList.add(settings.class);
  let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
  words = (0, import_map.default)(words, (word) => {
    return `<span class="s-split-lines">${word}</span>`;
  }).join(" ");
  elm.innerHTML = words;
  const spans = elm.querySelectorAll("span.s-split-lines");
  let top = null;
  const lines = [];
  let line = [];
  [].forEach.call(spans, (spanElm) => {
    const spanTop = spanElm.getBoundingClientRect().top;
    if (top && spanTop !== top) {
      lines.push(line.join(" "));
      line = [];
    }
    line.push(spanElm.innerHTML.trim());
    top = spanTop;
  });
  lines.push(line.join(" "));
  elm.innerHTML = lines.map((lineStr) => {
    return `<${settings.tag} class="${settings.class}__line">${lineStr}</${settings.tag}>`;
  }).join("");
}
var splitLines_default = splitLines;
