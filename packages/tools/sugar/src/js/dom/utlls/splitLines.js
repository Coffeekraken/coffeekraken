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
import __throttle from "../../shared/function/throttle";
function splitLines(elm, settings = {}) {
  settings = __spreadValues({
    tag: "p",
    class: "split-lines"
  }, settings);
  window.addEventListener("resize", __throttle((e) => {
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
  words = _map(words, (word) => {
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
export {
  splitLines_default as default
};
