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
var inputAdditionalEvents_exports = {};
__export(inputAdditionalEvents_exports, {
  default: () => inputAdditionalEvents_default
});
module.exports = __toCommonJS(inputAdditionalEvents_exports);
var import_fastdom = __toESM(require("fastdom"));
var import_dispatchEvent = __toESM(require("../dom/event/dispatchEvent"));
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
        import_fastdom.default.mutate(() => {
          if (e.keyCode) {
            switch (e.keyCode) {
              case 13:
                if (settings.enter && field.hasAttribute("onenter")) {
                  eval(field.getAttribute("onenter"));
                  (0, import_dispatchEvent.default)(field, "enter");
                }
                break;
              case 27:
                if (settings.escape && field.hasAttribute("onescape")) {
                  eval(field.getAttribute("onescape"));
                  (0, import_dispatchEvent.default)(field, "escape");
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
