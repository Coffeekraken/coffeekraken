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
var testEnv_exports = {};
__export(testEnv_exports, {
  default: () => testEnv_default
});
module.exports = __toCommonJS(testEnv_exports);
function isTestEnv() {
  var _a;
  return ((_a = process == null ? void 0 : process.env) == null ? void 0 : _a.NODE_ENV) === "test";
}
var testEnv_default = isTestEnv;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
