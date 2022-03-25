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
var when_exports = {};
__export(when_exports, {
  default: () => when,
  triggers: () => triggers
});
module.exports = __toCommonJS(when_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_whenInViewport = __toESM(require("./whenInViewport"));
var import_whenNearViewport = __toESM(require("./whenNearViewport"));
var import_whenOutOfViewport = __toESM(require("./whenOutOfViewport"));
var import_whenInteract = __toESM(require("./whenInteract"));
var import_whenDomReady = __toESM(require("./whenDomReady"));
var import_whenVisible = __toESM(require("./whenVisible"));
var import_whenStylesheetsReady = __toESM(require("./whenStylesheetsReady"));
const triggers = ["direct", "directly", "inViewport", "nearViewport", "outOfViewport", "interact", "visible", "stylesheetsReady"];
function when($elm, trigger, settings) {
  const finalSettings = __spreadValues({
    whenInViewport: {},
    whenNearViewport: {},
    whenOutOfViewport: {},
    whenInteract: {},
    whenVisible: {},
    whenStylesheetsReady: {}
  }, settings != null ? settings : {});
  return new import_s_promise.default(async ({ resolve, reject }) => {
    if (!Array.isArray(trigger))
      trigger = trigger.split(",").map((t) => t.trim());
    const promises = [];
    trigger.forEach((t) => {
      switch (t) {
        case "inViewport":
          promises.push((0, import_whenInViewport.default)($elm, finalSettings.whenInViewport));
          break;
        case "nearViewport":
          promises.push((0, import_whenNearViewport.default)($elm, finalSettings.whenNearViewport));
          break;
        case "outOfViewport":
          promises.push((0, import_whenOutOfViewport.default)($elm, finalSettings.whenOutOfViewport));
          break;
        case "interact":
          promises.push((0, import_whenInteract.default)($elm, finalSettings.whenInteract));
          break;
        case "visible":
          promises.push((0, import_whenVisible.default)($elm, finalSettings.whenVisible));
          break;
        case "domReady":
          promises.push((0, import_whenDomReady.default)());
          break;
        case "stylesheetsReady":
          promises.push((0, import_whenStylesheetsReady.default)($elm ? [$elm] : null));
          break;
      }
    });
    if (!trigger.length || trigger.includes("direct") || trigger.includes("directly")) {
      resolve();
      return;
    }
    await Promise.race(promises);
    resolve();
  });
}
