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
import _map from "lodash/map";
function splitWords(elm, settings = {}) {
  settings = __spreadValues({
    tag: "span",
    class: "split-words"
  }, settings);
  _splitWords(elm, settings);
  return elm;
}
function _splitWords(elm, settings) {
  let string = elm._splitWordsOriginalString;
  if (!string) {
    string = elm.innerHTML;
    elm._splitWordsOriginalString = string;
  }
  elm.classList.add(settings.class);
  let words = string.match(/<\s*(\w+\b)(?:(?!<\s*\/\s*\1\b)[\s\S])*<\s*\/\s*\1\s*>|\S+/g);
  words = _map(words, (word) => {
    return `<${settings.tag} class="${settings.class}__word">${word}</${settings.tag}>`;
  }).join(" ");
  elm.innerHTML = words;
}
var splitWords_default = splitWords;
export {
  splitWords_default as default
};
