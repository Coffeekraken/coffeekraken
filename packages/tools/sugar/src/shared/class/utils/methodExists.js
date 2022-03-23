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
var methodExists_exports = {};
__export(methodExists_exports, {
  default: () => methodExists_default
});
module.exports = __toCommonJS(methodExists_exports);
function methodExists(instance, ...methods) {
  const missingMethodsArray = [];
  if (!Array.isArray(methods))
    methods = [methods];
  methods.forEach((method) => {
    if (typeof instance[method] !== "function")
      missingMethodsArray.push(method);
  });
  return !missingMethodsArray.length ? true : missingMethodsArray;
}
var methodExists_default = methodExists;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
