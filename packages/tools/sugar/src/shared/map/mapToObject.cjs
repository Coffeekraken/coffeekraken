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
var mapToObject_exports = {};
__export(mapToObject_exports, {
  default: () => mapToObject_default
});
module.exports = __toCommonJS(mapToObject_exports);
function mapToObject(map) {
  const obj = {};
  for (const [k, v] of map)
    obj[k] = v;
  return obj;
}
var mapToObject_default = mapToObject;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
