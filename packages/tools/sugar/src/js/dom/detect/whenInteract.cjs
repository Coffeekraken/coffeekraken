import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var whenInteract_exports = {};
__export(whenInteract_exports, {
  default: () => whenInteract
});
module.exports = __toCommonJS(whenInteract_exports);
var import_WhenInteractSettingsInterface = __toESM(require("./interface/WhenInteractSettingsInterface"), 1);
function whenInteract(elm, settings) {
  return new Promise((resolve, reject) => {
    settings = import_WhenInteractSettingsInterface.default.apply(settings != null ? settings : {});
    function interacted(interaction) {
      resolve(interaction);
      elm.removeEventListener("mouseover", mouseover);
      elm.removeEventListener("mouseout", mouseout);
      elm.removeEventListener("click", click);
      elm.removeEventListener("touchstart", touchstart);
      elm.removeEventListener("touchend", touchend);
      elm.removeEventListener("focus", focus);
      elm.removeEventListener("focusin", focus);
    }
    function mouseover(e) {
      interacted("mouseover");
    }
    if (settings.mouseover) {
      elm.addEventListener("mouseover", mouseover);
    }
    function mouseout(e) {
      interacted("mouseout");
    }
    if (settings.mouseout) {
      elm.addEventListener("mouseout", mouseout);
    }
    function click(e) {
      interacted("click");
    }
    if (settings.click) {
      elm.addEventListener("click", click);
    }
    function touchstart(e) {
      interacted("touchstart");
    }
    if (settings.touchstart) {
      elm.addEventListener("touchstart", touchstart);
    }
    function touchend(e) {
      interacted("touchend");
    }
    if (settings.touchend) {
      elm.addEventListener("touchend", touchend);
    }
    function focus(e) {
      interacted("focus");
    }
    if (settings.focus === true) {
      elm.addEventListener("focus", focus);
      elm.addEventListener("focusin", focus);
    }
  });
}
