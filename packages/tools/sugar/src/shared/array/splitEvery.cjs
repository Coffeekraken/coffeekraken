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
var splitEvery_exports = {};
__export(splitEvery_exports, {
  default: () => splitEvery_default
});
module.exports = __toCommonJS(splitEvery_exports);
function splitEvery(array, every) {
  let i, j;
  const finalArray = [];
  for (i = 0, j = array.length; i < j; i += every) {
    finalArray.push(array.slice(i, i + every));
  }
  return finalArray;
}
var splitEvery_default = splitEvery;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
