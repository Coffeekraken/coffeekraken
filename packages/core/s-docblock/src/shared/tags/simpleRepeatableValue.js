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
var simpleRepeatableValue_exports = {};
__export(simpleRepeatableValue_exports, {
  default: () => simpleRepeatableValue_default
});
module.exports = __toCommonJS(simpleRepeatableValue_exports);
function simpleRepeatableValue(data, blockSettings) {
  data = Array.from(data);
  data = data.map((d) => {
    const val = new String(d.value);
    val.render = true;
    return val;
  });
  return data;
}
var simpleRepeatableValue_default = simpleRepeatableValue;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
