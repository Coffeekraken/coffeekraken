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
var getTagNameFromHtmlClass_exports = {};
__export(getTagNameFromHtmlClass_exports, {
  default: () => getTagNameFromHtmlClass_default
});
module.exports = __toCommonJS(getTagNameFromHtmlClass_exports);
var import_htmlTagToHtmlClassMap = __toESM(require("./htmlTagToHtmlClassMap"), 1);
function getHtmlhtmlClassFromHtmlClass(htmlClass) {
  if (!htmlClass)
    return false;
  for (const key in import_htmlTagToHtmlClassMap.default) {
    if (import_htmlTagToHtmlClassMap.default[key] === htmlClass)
      return key;
  }
  return false;
}
var getTagNameFromHtmlClass_default = getHtmlhtmlClassFromHtmlClass;
