import {
  __spreadValues
} from "../../../../../chunk-PG3ZPS4G.mjs";
import hotkeys from "hotkeys-js/dist/hotkeys.common";
import __SPromise from "@coffeekraken/s-promise";
hotkeys.filter = function() {
  return true;
};
function hotkey(hotkey2, settings = {}) {
  return new __SPromise(({ resolve, reject, emit, cancel }) => {
    settings = __spreadValues({
      element: null,
      keyup: false,
      keydown: true,
      once: false,
      splitKey: "+"
    }, settings);
    hotkeys(hotkey2, settings, (e, h) => {
      emit("press", e);
      if (settings.once)
        cancel();
    });
  }, {
    id: "hotkey"
  }).on("finally", () => {
    hotkeys.unbind(hotkey2);
  });
}
var hotkey_default = hotkey;
export {
  hotkey_default as default
};
