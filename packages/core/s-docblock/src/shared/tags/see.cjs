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
var see_exports = {};
__export(see_exports, {
  default: () => see_default
});
module.exports = __toCommonJS(see_exports);
function see(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = [];
  data.forEach((see2) => {
    var _a;
    if (!see2.value)
      return;
    const parts = see2.value.split(/\s{2,20000}/).map((l) => l.trim());
    const url = parts[0], description = new String((_a = parts[1]) != null ? _a : "");
    description.render = true;
    res.push({
      url,
      description
    });
  });
  return res;
}
var see_default = see;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
