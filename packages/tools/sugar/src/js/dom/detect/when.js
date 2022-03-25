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
import __SPromise from "@coffeekraken/s-promise";
import __whenInViewport from "./whenInViewport";
import __whenNearViewport from "./whenNearViewport";
import __whenOutOfViewport from "./whenOutOfViewport";
import __whenInteract from "./whenInteract";
import __whenDomReady from "./whenDomReady";
import __whenVisible from "./whenVisible";
import __whenStylesheetsReady from "./whenStylesheetsReady";
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
  return new __SPromise(async ({ resolve, reject }) => {
    if (!Array.isArray(trigger))
      trigger = trigger.split(",").map((t) => t.trim());
    const promises = [];
    trigger.forEach((t) => {
      switch (t) {
        case "inViewport":
          promises.push(__whenInViewport($elm, finalSettings.whenInViewport));
          break;
        case "nearViewport":
          promises.push(__whenNearViewport($elm, finalSettings.whenNearViewport));
          break;
        case "outOfViewport":
          promises.push(__whenOutOfViewport($elm, finalSettings.whenOutOfViewport));
          break;
        case "interact":
          promises.push(__whenInteract($elm, finalSettings.whenInteract));
          break;
        case "visible":
          promises.push(__whenVisible($elm, finalSettings.whenVisible));
          break;
        case "domReady":
          promises.push(__whenDomReady());
          break;
        case "stylesheetsReady":
          promises.push(__whenStylesheetsReady($elm ? [$elm] : null));
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
export {
  when as default,
  triggers
};
