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
var addEventListenerOnce_exports = {};
__export(addEventListenerOnce_exports, {
  default: () => addEventListenerOnce_default
});
module.exports = __toCommonJS(addEventListenerOnce_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_addEventListener = __toESM(require("./addEventListener"));
function addEventListenerOnce($elm, eventNames, callback = null, useCapture = false) {
  if (!Array.isArray(eventNames))
    eventNames = [eventNames];
  const globalPromise = new import_s_promise.default({
    id: "addEventListenerOnce"
  });
  const eventsStack = {};
  globalPromise.on("finally", () => {
    eventNames.forEach((eventName) => {
      eventsStack[eventName].promise.cancel();
    });
  });
  eventNames.forEach((eventName) => {
    const promise = (0, import_addEventListener.default)($elm, eventName, null, useCapture);
    eventsStack[eventName] = {
      promise
    };
    promise.on(eventNames, (event) => {
      if (callback && typeof callback === "function") {
        callback.apply(this, [event]);
      }
      globalPromise.emit(eventName, event);
      promise.cancel();
    });
  });
  return globalPromise;
}
var addEventListenerOnce_default = addEventListenerOnce;
