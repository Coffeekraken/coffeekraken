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
var hotkey_exports = {};
__export(hotkey_exports, {
  HotkeySettingsInterface: () => HotkeySettingsInterface,
  SettingsInterface: () => HotkeySettingsInterface,
  default: () => hotkey_default
});
module.exports = __toCommonJS(hotkey_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_uniqid = __toESM(require("../../shared/string/uniqid"));
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_childProcess = __toESM(require("../is/childProcess"));
const hotkeyStack = {};
let isListenerAlreadyAdded = false;
const isSystemWideAlreadyAdded = false;
class HotkeySettingsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      once: {
        type: "Boolean",
        description: "Specify if you want to capture the hotkey just once",
        default: false
      },
      splitChar: {
        type: "String",
        description: "Define the character to use to split shortcuts",
        default: "+"
      }
    };
  }
}
function _handleKeypress(ch, keyObj) {
  if (keyObj && keyObj.ctrl && keyObj.name == "c") {
    process.emit("custom_exit", "killed");
  }
  Object.keys(hotkeyStack).forEach((id) => {
    const obj = hotkeyStack[id];
    if (!obj || !obj.key)
      return;
    obj.key.toString().split(",").map((m) => m.trim()).forEach((key) => {
      if (ch && ch.toString() === key) {
        obj.promise.emit("press", {
          key,
          ctrl: keyObj ? keyObj.ctrl : false,
          meta: keyObj ? keyObj.meta : false,
          shift: keyObj ? keyObj.shift : false
        });
        return;
      }
      if (!keyObj)
        return;
      let pressedKey = keyObj.name;
      if (keyObj.ctrl)
        pressedKey = `ctrl${obj.settings.splitChar}${pressedKey}`;
      if (keyObj.shift)
        pressedKey = `shift${obj.settings.splitChar}${pressedKey}`;
      if (keyObj.meta)
        pressedKey = `alt${obj.settings.splitChar}${pressedKey}`;
      if (pressedKey === key) {
        obj.promise.emit("press", {
          key,
          ctrl: keyObj ? keyObj.ctrl : false,
          meta: keyObj ? keyObj.meta : false,
          shift: keyObj ? keyObj.shift : false
        });
      }
    });
  });
}
function hotkey(key, settings) {
  const set = HotkeySettingsInterface.apply(settings);
  const promise = new import_s_promise.default({
    id: "hotkey"
  });
  if (!(0, import_childProcess.default)()) {
    const uniqid = `hotkey.${(0, import_uniqid.default)()}`;
    if (!isListenerAlreadyAdded) {
      isListenerAlreadyAdded = true;
      process.stdin.on("keypress", _handleKeypress);
      process.stdin.setRawMode(true);
      process.stdin.resume();
    }
    promise.on("press", (key2) => {
      if (set.once) {
        promise.cancel();
      }
    }).on("finally", () => {
      delete hotkeyStack[uniqid];
    });
    hotkeyStack[uniqid] = {
      key,
      promise,
      settings: set
    };
  }
  return promise;
}
var hotkey_default = hotkey;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HotkeySettingsInterface,
  SettingsInterface
});
