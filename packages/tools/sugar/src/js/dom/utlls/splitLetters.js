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
  words = _map(words, (word) => {
    return `<${settings.tag} style="white-space:nowrap">${word}</${settings.tag}>`;
  }).join(" ");
  let letters = _decodeHtml(words).split("");
  let hasTagOpened = false;
  letters = _map(letters, (letter) => {
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
export {
  splitLetters_default as default
};
