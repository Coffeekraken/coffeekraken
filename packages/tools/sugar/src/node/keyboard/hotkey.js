import __SPromise from "@coffeekraken/s-promise";
import __uniqid from "../../shared/string/uniqid";
import __SInterface from "@coffeekraken/s-interface";
import __isChildProcess from "../is/childProcess";
const hotkeyStack = {};
let isListenerAlreadyAdded = false;
const isSystemWideAlreadyAdded = false;
class HotkeySettingsInterface extends __SInterface {
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
  const promise = new __SPromise({
    id: "hotkey"
  });
  if (!__isChildProcess()) {
    const uniqid = `hotkey.${__uniqid()}`;
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
export {
  HotkeySettingsInterface,
  HotkeySettingsInterface as SettingsInterface,
  hotkey_default as default
};
