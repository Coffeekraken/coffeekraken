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
var integer_exports = {};
__export(integer_exports, {
  default: () => integer_default
});
module.exports = __toCommonJS(integer_exports);
function isInteger(data) {
  return typeof data === "number" && !isNaN(data) && function(x) {
    return (x | 0) === x;
  }(parseFloat(data));
}
var integer_default = isInteger;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
