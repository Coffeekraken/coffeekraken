import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var hotkey_exports = {};
__export(hotkey_exports, {
  default: () => hotkey_default
});
module.exports = __toCommonJS(hotkey_exports);
var import_hotkeys = __toESM(require("hotkeys-js/dist/hotkeys.common"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
import_hotkeys.default.filter = function() {
  return true;
};
function hotkey(hotkey2, settings = {}) {
  return new import_s_promise.default(({ resolve, reject, emit, cancel }) => {
    settings = __spreadValues({
      element: null,
      keyup: false,
      keydown: true,
      once: false,
      splitKey: "+"
    }, settings);
    (0, import_hotkeys.default)(hotkey2, settings, (e, h) => {
      emit("press", e);
      if (settings.once)
        cancel();
    });
  }, {
    id: "hotkey"
  }).on("finally", () => {
    import_hotkeys.default.unbind(hotkey2);
  });
}
var hotkey_default = hotkey;
