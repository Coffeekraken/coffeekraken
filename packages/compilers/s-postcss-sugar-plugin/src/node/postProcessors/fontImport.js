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
var fontImport_exports = {};
__export(fontImport_exports, {
  default: () => fontImport_default
});
module.exports = __toCommonJS(fontImport_exports);
function fontImport_default({ root }) {
  root.walkAtRules((atRule) => {
    if (atRule.name.match(/^import/) && !atRule._fontImportMoved) {
      if (atRule.params.match(/^url\(('|")?https?:\/\//)) {
        atRule._fontImportMoved = true;
        atRule.remove();
        root.nodes.unshift(atRule);
      }
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
