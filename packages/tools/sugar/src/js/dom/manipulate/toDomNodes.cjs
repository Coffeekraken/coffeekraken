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
var toDomNodes_exports = {};
__export(toDomNodes_exports, {
  default: () => toDomNodes_default
});
module.exports = __toCommonJS(toDomNodes_exports);
var import_strToHtml = __toESM(require("../../shared/string/strToHtml"), 1);
function processString(string) {
  return string.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&nbsp;/g, " ");
}
function processNodeElm(elm) {
  switch (elm.tagName.toLowerCase()) {
    case "script":
      return (0, import_strToHtml.default)(elm.innerHTML);
      break;
    case "template":
      return document.importNode(elm.content, true);
      break;
    default:
      return elm;
      break;
  }
}
function toDomNodes(source) {
  if (source.tagName) {
    return processNodeElm(source);
  }
  if (typeof source === "string")
    source = source.trim();
  if (typeof source === "string" && source.substr(0, 1) === "<" && source.substr(-1) === ">") {
    return (0, import_strToHtml.default)(source);
  }
  if (typeof source === "string") {
    const tpl = document.querySelector(source);
    if (!tpl)
      return;
    return processNodeElm(tpl);
  }
}
var toDomNodes_default = toDomNodes;
