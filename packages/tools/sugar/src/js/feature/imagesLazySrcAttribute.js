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
var imagesLazySrcAttribute_exports = {};
__export(imagesLazySrcAttribute_exports, {
  default: () => imagesLazySrcAttribute_default
});
module.exports = __toCommonJS(imagesLazySrcAttribute_exports);
var import_whenInViewport = __toESM(require("../dom/whenInViewport"), 1);
var import_querySelectorLive = __toESM(require("../dom/querySelectorLive"), 1);
var import_deepMerge = __toESM(require("../../shared/object/deepMerge"), 1);
function imagesLazySrcAttribute(settings = {}) {
  settings = (0, import_deepMerge.default)({
    offset: 50
  }, settings);
  (0, import_querySelectorLive.default)("img[lazy-src]:not([is])", ($imgElm) => {
    (0, import_whenInViewport.default)($imgElm, settings.offset).then(() => {
      $imgElm.setAttribute("src", $imgElm.getAttribute("lazy-src"));
    });
  });
}
var imagesLazySrcAttribute_default = imagesLazySrcAttribute;
