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
var expandPleasantCssClassnames_exports = {};
__export(expandPleasantCssClassnames_exports, {
  default: () => expandPleasantCssClassnames
});
module.exports = __toCommonJS(expandPleasantCssClassnames_exports);
var import_expandPleasantCssClassname = __toESM(require("./expandPleasantCssClassname"));
function expandPleasantCssClassnames(html) {
  const reg = /class="[a-zA-Z0-9_\-:@\s]+"/gm;
  const matches = html.match(reg);
  if (!matches)
    return html;
  matches.forEach((match) => {
    const classesStr = match.trim().replace('class="', "").replace('"', "");
    const newClassesStr = (0, import_expandPleasantCssClassname.default)(classesStr);
    html = html.replace(match, `class="${newClassesStr}"`);
  });
  const escapedReg = /class=".*\\:.*/gm;
  const escapedMatches = html.match(escapedReg);
  if (escapedMatches && escapedMatches.length) {
    escapedMatches.forEach((match) => {
      const newClass = match.replace("\\:", ":");
      html = html.replace(match, newClass);
    });
  }
  return html;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
