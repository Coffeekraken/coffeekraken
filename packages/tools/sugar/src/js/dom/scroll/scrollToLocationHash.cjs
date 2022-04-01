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
var scrollToLocationHash_exports = {};
__export(scrollToLocationHash_exports, {
  default: () => scrollToLocationHash_default
});
module.exports = __toCommonJS(scrollToLocationHash_exports);
var import_scrollTo = __toESM(require("./scrollTo"), 1);
var import_deepMerge = __toESM(require("../../../shared/object/deepMerge"), 1);
function scrollToLocationHash(settings = {}) {
  settings = (0, import_deepMerge.default)({
    scroll: {}
  }, settings);
  const hash = document.location.hash;
  if (!hash)
    return;
  const targetElm = document.querySelector(hash);
  if (!targetElm)
    return;
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  return (0, import_scrollTo.default)(targetElm, settings.scroll);
}
var scrollToLocationHash_default = scrollToLocationHash;
