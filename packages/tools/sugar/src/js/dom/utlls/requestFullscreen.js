var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var requestFullscreen_exports = {};
__export(requestFullscreen_exports, {
  default: () => requestFullscreen_default
});
module.exports = __toCommonJS(requestFullscreen_exports);
function requestFullscreen(elm) {
  if (elm.requestFullscreen) {
    return elm.requestFullscreen();
  } else if (elm.mozRequestFullScreen) {
    return elm.mozRequestFullScreen();
  } else if (elm.webkitRequestFullscreen) {
    return elm.webkitRequestFullscreen();
  } else if (elm.msRequestFullscreen) {
    return elm.msRequestFullscreen();
  }
}
var requestFullscreen_default = requestFullscreen;
