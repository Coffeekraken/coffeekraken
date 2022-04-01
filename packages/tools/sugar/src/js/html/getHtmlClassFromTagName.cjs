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
var getHtmlClassFromTagName_exports = {};
__export(getHtmlClassFromTagName_exports, {
  default: () => getHtmlClassFromTagName_default
});
module.exports = __toCommonJS(getHtmlClassFromTagName_exports);
var import_upperFirst = __toESM(require("../../shared/string/upperFirst"), 1);
var import_htmlTagToHtmlClassMap = __toESM(require("./htmlTagToHtmlClassMap"), 1);
function getHtmlClassFromTagName(tagName) {
  if (!tagName)
    return HTMLElement;
  const tagNameUpperFirst = (0, import_upperFirst.default)(tagName);
  if (window[`HTML${tagNameUpperFirst}Element`])
    return window[`HTML${tagNameUpperFirst}Element`];
  if (import_htmlTagToHtmlClassMap.default[tagName])
    return import_htmlTagToHtmlClassMap.default[tagName];
  return window.HTMLElement;
}
var getHtmlClassFromTagName_default = getHtmlClassFromTagName;
