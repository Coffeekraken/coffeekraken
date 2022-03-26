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
var imageLoaded_exports = {};
__export(imageLoaded_exports, {
  default: () => imageLoaded_default
});
module.exports = __toCommonJS(imageLoaded_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
function imageLoaded($img, callback = null) {
  let imgLoadedHandler, imgErrorHandler;
  return new import_s_promise.default(({ resolve, reject }) => {
    if ($img.hasAttribute("src") && $img.complete) {
      resolve($img);
      callback && callback($img);
    } else {
      imgLoadedHandler = (e) => {
        resolve($img);
        callback && callback($img);
      };
      $img.addEventListener("load", imgLoadedHandler);
      imgErrorHandler = (e) => {
        reject(e);
      };
      $img.addEventListener("error", imgErrorHandler);
    }
  }, {
    id: "imageLoaded"
  }).on("finally", () => {
    imgLoadedHandler && $img.removeEventListener("load", imgLoadedHandler);
    imgErrorHandler && $img.removeEventListener("error", imgErrorHandler);
  });
}
var imageLoaded_default = imageLoaded;
