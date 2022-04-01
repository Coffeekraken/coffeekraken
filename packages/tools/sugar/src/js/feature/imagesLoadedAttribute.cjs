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
var imagesLoadedAttribute_exports = {};
__export(imagesLoadedAttribute_exports, {
  default: () => imagesLoadedAttribute_default
});
module.exports = __toCommonJS(imagesLoadedAttribute_exports);
var import_imageLoaded = __toESM(require("../dom/load/imageLoaded"), 1);
function imagesLoadedAttribute() {
  document.addEventListener("load", (e) => {
    if (!e.target.tagName)
      return;
    if (e.target.tagName.toLowerCase() !== "img")
      return;
    if (e.target.hasAttribute("loaded"))
      return;
    e.target.setAttribute("loaded", true);
  }, true);
  [].forEach.call(document.querySelectorAll("img"), (img) => {
    (0, import_imageLoaded.default)(img).then((img2) => {
      if (img2.hasAttribute("loaded"))
        return;
      img2.setAttribute("loaded", true);
    });
  });
}
var imagesLoadedAttribute_default = imagesLoadedAttribute;
