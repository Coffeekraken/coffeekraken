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
var astNodesToString_exports = {};
__export(astNodesToString_exports, {
  default: () => astNodesToString
});
module.exports = __toCommonJS(astNodesToString_exports);
function astNodesToString(nodes) {
  const res = nodes.map((node) => {
    if (node.type === "decl")
      return node.toString() + ";";
    return node.toString();
  }).map((item) => {
    item = item.trim();
    if (!item.match(/\}$/) && !item.match(/;$/)) {
      item += ";";
    }
    return item;
  });
  return res.join("\n");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
