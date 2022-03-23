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
var splitLetters_exports = {};
__export(splitLetters_exports, {
  default: () => splitLetters_default
});
module.exports = __toCommonJS(splitLetters_exports);
var import_map = __toESM(require("lodash/map"), 1);
function _decodeHtml(html) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}
function splitLetters(elm, settings = {}) {
  settings = __spreadValues({
    tag: "span",
    class: "s-split-litters"
  }, settings);
  let string = elm._splitLettersOriginalString;
  if (!string) {
    string = elm.innerHTML;
    elm._splitLettersOriginalString = string;
  }
  elm.classList.add(settings.class);
  let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
  words = (0, import_map.default)(words, (word) => {
    return `<${settings.tag} style="white-space:nowrap">${word}</${settings.tag}>`;
  }).join(" ");
  let letters = _decodeHtml(words).split("");
  let hasTagOpened = false;
  letters = (0, import_map.default)(letters, (letter) => {
    if (letter === "<")
      hasTagOpened = true;
    else if (letter === ">") {
      hasTagOpened = false;
      return letter;
    }
    if (hasTagOpened)
      return letter;
    if (letter === " ")
      letter = "&nbsp;";
    return `<${settings.tag} class="${settings.class}__letter-container"><${settings.tag} class="${settings.class}__letter">${letter}</${settings.tag}></${settings.tag}>`;
  });
  elm.innerHTML = letters.join("");
  return elm;
}
var splitLetters_default = splitLetters;
