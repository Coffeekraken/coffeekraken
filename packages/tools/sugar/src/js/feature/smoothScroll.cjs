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
var smoothScroll_exports = {};
__export(smoothScroll_exports, {
  default: () => smoothScroll_default
});
module.exports = __toCommonJS(smoothScroll_exports);
var import_smoothScrollOnAnchorLinks = __toESM(require("./smoothScrollOnAnchorLinks"), 1);
var import_smoothScrollOnPageLoad = __toESM(require("./smoothScrollOnPageLoad"), 1);
var import_smoothScrollOnHashChange = __toESM(require("./smoothScrollOnHashChange"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
function smoothScroll(settings = {}) {
  settings = (0, import_deepMerge.default)({
    scroll: {}
  }, settings);
  (0, import_smoothScrollOnPageLoad.default)(settings);
  (0, import_smoothScrollOnAnchorLinks.default)(settings);
  (0, import_smoothScrollOnHashChange.default)(settings);
}
var smoothScroll_default = smoothScroll;
