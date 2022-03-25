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
var replaceTags_exports = {};
__export(replaceTags_exports, {
  default: () => replaceTags_default
});
module.exports = __toCommonJS(replaceTags_exports);
var import_toString = __toESM(require("../string/toString"));
function replaceTags(text, tags) {
  if (!text)
    text = "";
  text = (0, import_toString.default)(text);
  let oneLineText = text.replace(/\r\n/g, "|rn|");
  oneLineText = oneLineText.replace(/\n/g, "|n|");
  oneLineText = oneLineText.replace(/\r/g, "|r|");
  Object.keys(tags).forEach((tagName) => {
    const reg = new RegExp(`<s*${tagName}[^>]*>((.*?))<\\s*/\\s*${tagName}>`, "g");
    const tagsArray = oneLineText.match(reg);
    const singleReg = new RegExp(`\\s?<${tagName}\\s?/>\\s?`, "g");
    const singleTagsArray = oneLineText.match(singleReg);
    if (tagsArray) {
      for (let i = 0; i < tagsArray.length; i++) {
        const t = tagsArray[i];
        const tagArgs = t.match(`<\\s*${tagName}[^>]*>((.*?))<\\s*/\\s*${tagName}>`);
        if (!tagArgs)
          continue;
        const tagToReplace = tagArgs[0];
        const tagContent = tagArgs[1];
        oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }
    if (singleTagsArray) {
      for (let i = 0; i < singleTagsArray.length; i++) {
        const t = singleTagsArray[i];
        const tagArgs = t.match(`\\s?<${tagName}\\s?/>\\s?`);
        if (!tagArgs)
          continue;
        const tagToReplace = tagArgs[0];
        const tagContent = "";
        oneLineText = oneLineText.replace(tagToReplace, tags[tagName](tagName, tagContent));
      }
    }
  });
  oneLineText = oneLineText.replace(/\|rn\|/g, "\r\n");
  oneLineText = oneLineText.replace(/\|n\|/g, "\n");
  oneLineText = oneLineText.replace(/\|r\|/g, "\r");
  return oneLineText;
}
var replaceTags_default = replaceTags;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
