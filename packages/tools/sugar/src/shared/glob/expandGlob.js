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
var expandGlob_exports = {};
__export(expandGlob_exports, {
  default: () => expandGlob_default
});
module.exports = __toCommonJS(expandGlob_exports);
function expandGlob(globs) {
  if (!Array.isArray(globs))
    globs = [globs];
  const finalPatterns = [];
  globs.forEach((globPattern) => {
    const maxDepthMatch = globPattern.match(/\/?\*\{(([0-9]+,[0-9]+|[0-9]+))\}\/?/gm);
    if (maxDepthMatch) {
      const minMaxStr = maxDepthMatch[0].replace("*{", "").replace("}", "").replace(/[\{\}\/]/g, "");
      const toReplace = maxDepthMatch[0].replace(/\//g, "");
      const spl = minMaxStr.split(",");
      let min = 0;
      let max = parseInt(spl[0]);
      if (spl.length === 2) {
        min = parseInt(spl[0]);
        max = parseInt(spl[1]);
      }
      const foldersArray = [
        ..."* ".repeat(min).split(" ").filter((l) => l !== "")
      ];
      for (let i = min; i < max; i++) {
        finalPatterns.push(globPattern.replace(toReplace, foldersArray.join("/")).replace(/\/\//g, "/"));
        foldersArray.push("*");
      }
      finalPatterns.push(globPattern.replace(toReplace, foldersArray.join("/")).replace(/\/\//g, "/"));
    } else {
      finalPatterns.push(globPattern);
    }
  });
  return finalPatterns;
}
var expandGlob_default = expandGlob;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
