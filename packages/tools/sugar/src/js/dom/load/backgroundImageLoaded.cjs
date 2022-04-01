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
var backgroundImageLoaded_exports = {};
__export(backgroundImageLoaded_exports, {
  default: () => backgroundImageLoaded_default
});
module.exports = __toCommonJS(backgroundImageLoaded_exports);
var import_getStyleProperty = __toESM(require("../style/getStyleProperty"), 1);
var import_imageLoaded = __toESM(require("./imageLoaded"), 1);
var import_unquote = __toESM(require("../../../shared/string/unquote"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
function backgroundImageLoaded($elm, cb = null) {
  let isCancelled = false, $img;
  const promise = new import_s_promise.default(({ resolve, reject, emit }) => {
    const backgroundImage = (0, import_getStyleProperty.default)($elm, "background-image");
    const matches = backgroundImage.match(/.*url\((.*)\).*/);
    if (!matches || !matches[1]) {
      reject("No background image url found...");
      return;
    }
    const url = (0, import_unquote.default)(matches[1]);
    $img = new Image();
    $img.src = url;
    (0, import_imageLoaded.default)($img).then(() => {
      if (!isCancelled) {
        if (cb)
          cb($elm);
        resolve($elm);
      }
    });
  }, {
    id: "backgroundImageLoaded"
  }).on("finally", () => {
    isCancelled = true;
  });
  promise.__$img = $img;
  return promise;
}
var backgroundImageLoaded_default = backgroundImageLoaded;
