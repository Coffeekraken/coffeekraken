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
var map_exports = {};
__export(map_exports, {
  default: () => map_default
});
module.exports = __toCommonJS(map_exports);
function map(object, processor) {
  for (let i = 0; i < Object.keys(object).length; i++) {
    const prop = Object.keys(object)[i];
    const res = processor({
      value: object[prop],
      key: prop,
      prop,
      i,
      idx: i
    });
    if (res === -1)
      delete object[prop];
    else
      object[prop] = res;
  }
  return object;
}
var map_default = map;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
