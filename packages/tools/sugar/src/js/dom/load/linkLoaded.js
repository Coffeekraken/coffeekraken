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
var linkLoaded_exports = {};
__export(linkLoaded_exports, {
  default: () => linkLoaded_default
});
module.exports = __toCommonJS(linkLoaded_exports);
function alreadyLoaded(link) {
  const href = link.href;
  let result = false;
  for (let i = 0; i < document.styleSheets.length; i++) {
    if (document.styleSheets[i].href && document.styleSheets[i].href.match(href)) {
      result = true;
    } else if (i == document.styleSheets.length - 1) {
    }
  }
  return result;
}
function linkLoaded(link, cb = null) {
  return new Promise((resolve, reject) => {
    if (alreadyLoaded(link)) {
      resolve(link);
      cb != null && cb(link);
    } else {
      const img = document.createElement("img");
      img.addEventListener("error", (e) => {
        resolve(link);
        cb != null && cb(link);
      });
      img.src = link.href;
    }
  });
}
var linkLoaded_default = linkLoaded;
