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
var crop_exports = {};
__export(crop_exports, {
  default: () => crop_default
});
module.exports = __toCommonJS(crop_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
var import_countLine = __toESM(require("./countLine"), 1);
function crop(text, length, settings = {}) {
  settings = (0, import_deepMerge.default)({
    chars: "...",
    splitWords: false
  }, settings);
  text = text.replace(/\s/gm, "\xAF");
  const splitReg = /(<([^>]+)>|\S|\s)/gm;
  const parts = text.split(splitReg).filter((c) => {
    return c !== void 0 && c !== " " && c !== "" && (c.length === 1 || c.match(/^</));
  }).map((c) => {
    if (c === "\xAF")
      return " ";
    return c;
  });
  let result = "";
  let currentWord = "";
  let currentLength = 0;
  const openedHtmlTagsArray = [];
  for (let i = 0; i < parts.length; i++) {
    const c = parts[i];
    if (c.length === 1) {
      if (settings.splitWords) {
        if (currentLength + 1 + settings.chars.length <= length) {
          result += c;
          currentLength += 1;
        } else {
          result += settings.chars;
          currentLength += settings.chars.length;
          break;
        }
      } else {
        if (c !== " ") {
          currentWord += c;
        } else {
          if ((0, import_countLine.default)(result) + (0, import_countLine.default)(currentWord) + (0, import_countLine.default)(settings.chars) <= length) {
            result += currentWord;
          } else {
            result = result.trim();
            result += settings.chars;
            break;
          }
          result += " ";
          currentWord = "";
        }
      }
    } else {
      if (currentWord !== "") {
        result += currentWord;
        currentWord = "";
      }
      const closingHtmlTagMatch = c.match(/^<\//);
      const openingHtmlTagMatch = c.match(/^<[a-zA-Z]+.*>$/);
      const singleHtmlTagMatch = c.match(/^<[a-zA-Z]+.*\/>$/);
      if (singleHtmlTagMatch) {
        result += singleHtmlTagMatch.input;
      } else if (closingHtmlTagMatch) {
        const tagName = closingHtmlTagMatch.input.match(/^<\/(.*)>$/)[1];
        if (openedHtmlTagsArray.indexOf(tagName) !== -1) {
          result += closingHtmlTagMatch.input;
          openedHtmlTagsArray.splice(openedHtmlTagsArray.indexOf(tagName), 1);
        }
      } else if (openingHtmlTagMatch) {
        const tagName = openingHtmlTagMatch.input.match(/^<([a-zA-Z]+).*>$/)[1];
        result += openingHtmlTagMatch.input;
        openedHtmlTagsArray.push(tagName);
      }
    }
  }
  openedHtmlTagsArray.forEach((tag) => {
    result += `</${tag}>`;
  });
  return result;
}
var crop_default = crop;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
