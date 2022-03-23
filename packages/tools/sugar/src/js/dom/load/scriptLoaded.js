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
var scriptLoaded_exports = {};
__export(scriptLoaded_exports, {
  default: () => scriptLoaded_default
});
module.exports = __toCommonJS(scriptLoaded_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
function loadScript($script, cb = null) {
  return new import_s_promise.default(({ resolve, reject, emit }) => {
    let done = false;
    $script.onload = handleLoad;
    $script.onreadystatechange = handleReadyStateChange;
    $script.onerror = handleError;
    function handleLoad() {
      if (!done) {
        done = true;
        if (cb)
          cb($script);
        resolve($script);
      }
    }
    function handleReadyStateChange() {
      let state;
      if (!done) {
        state = $script.readyState;
        if (state === "complete") {
          handleLoad();
        }
      }
    }
    function handleError(e) {
      if (!done) {
        done = true;
        reject(new Error(e));
      }
    }
  }, {
    id: "scriptLoaded"
  }).on("finally", () => {
    $script.onload = null;
    $script.onreadystatechange = null;
    $script.onerror = null;
  });
}
var scriptLoaded_default = loadScript;
