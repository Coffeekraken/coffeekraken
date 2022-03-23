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
var simpleValue_exports = {};
__export(simpleValue_exports, {
  default: () => simpleValue_default
});
module.exports = __toCommonJS(simpleValue_exports);
function simpleValue(data, blockSettings) {
  if (data && data.value && typeof data.value === "string" && data.value.trim() === "") {
    return true;
  }
  const value = new String(data.value);
  value.render = true;
  return value;
}
var simpleValue_default = simpleValue;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
