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
var whenStylesheetsReady_exports = {};
__export(whenStylesheetsReady_exports, {
  default: () => whenStylesheetsReady
});
module.exports = __toCommonJS(whenStylesheetsReady_exports);
var import_linkLoaded = __toESM(require("../load/linkLoaded"), 1);
function whenStylesheetsReady(links = null, cb = null) {
  if (!links) {
    links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  }
  const promises = [];
  [].forEach.call(neededStylesheetsStack, ($link) => {
    promises.push((0, import_linkLoaded.default)($link));
  });
  const allPromises = Promise.all(promises);
  allPromises.then(() => {
    cb == null ? void 0 : cb();
  });
  return allPromises;
}
