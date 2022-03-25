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
var extractSame_exports = {};
__export(extractSame_exports, {
  default: () => extractSame_default
});
module.exports = __toCommonJS(extractSame_exports);
function extractSame(string1, string2, multiple = false) {
  const extractedArray = [""];
  const chars = string1.split("");
  const chars2 = string2.split("");
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const char2 = chars2[i];
    if (i > chars2.length - 1)
      break;
    if (char === char2) {
      extractedArray[extractedArray.length - 1] += char;
    } else if (multiple) {
      if (extractedArray[extractedArray.length - 1] !== "")
        extractedArray.push("");
    } else {
      break;
    }
  }
  return multiple ? extractedArray : extractedArray[0];
}
var extractSame_default = extractSame;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
