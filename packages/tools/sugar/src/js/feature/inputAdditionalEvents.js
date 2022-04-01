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
import fastdom from "fastdom";
import __dispatchEvent from "../dom/event/dispatchEvent";
function inputAdditionalEvents(settings = {}) {
  settings = __spreadValues({
    enter: true,
    escape: true
  }, settings);
  function handleInputAttributes(e) {
    const field = e.target ? e.target : e;
    if (!field || !field.tagName)
      return;
    switch (field.tagName) {
      case "INPUT":
      case "TEXTAREA":
        fastdom.mutate(() => {
          if (e.keyCode) {
            switch (e.keyCode) {
              case 13:
                if (settings.enter && field.hasAttribute("onenter")) {
                  eval(field.getAttribute("onenter"));
                  __dispatchEvent(field, "enter");
                }
                break;
              case 27:
                if (settings.escape && field.hasAttribute("onescape")) {
                  eval(field.getAttribute("onescape"));
                  __dispatchEvent(field, "escape");
                }
                break;
            }
          }
        });
        break;
    }
  }
  document.addEventListener("change", handleInputAttributes);
  document.addEventListener("keyup", handleInputAttributes);
}
var inputAdditionalEvents_default = inputAdditionalEvents;
export {
  inputAdditionalEvents_default as default
};
