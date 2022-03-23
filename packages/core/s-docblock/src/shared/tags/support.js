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
var support_exports = {};
__export(support_exports, {
  default: () => support_default
});
module.exports = __toCommonJS(support_exports);
function support(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = [];
  data.forEach((support2) => {
    var _a;
    if (!support2.value)
      return;
    const parts = support2.value.split(/\s{2,20000}/).map((l) => l.trim());
    const description = new String((_a = parts[1]) != null ? _a : "");
    description.render = true;
    res.push({
      name: parts[0],
      description
    });
  });
  return res;
}
var support_default = support;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
