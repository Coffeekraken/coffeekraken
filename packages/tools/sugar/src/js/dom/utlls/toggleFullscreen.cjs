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
var toggleFullscreen_exports = {};
__export(toggleFullscreen_exports, {
  default: () => toggleFullscreen_default
});
module.exports = __toCommonJS(toggleFullscreen_exports);
var import_requestFullscreen = __toESM(require("./requestFullscreen"), 1);
var import_exitFullscreen = __toESM(require("./exitFullscreen"), 1);
function toggleFullscreen(elm) {
  const fullscreenElm = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
  if (!fullscreenElm || fullscreenElm !== elm) {
    return (0, import_requestFullscreen.default)(elm);
  } else {
    return (0, import_exitFullscreen.default)();
  }
}
var toggleFullscreen_default = toggleFullscreen;
