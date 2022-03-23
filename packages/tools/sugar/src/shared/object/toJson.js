var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var toJson_exports = {};
__export(toJson_exports, {
  default: () => toJson
});
module.exports = __toCommonJS(toJson_exports);
var import_deepMap = __toESM(require("./deepMap"), 1);
var import_set = __toESM(require("./set"), 1);
function toJson(object) {
  const newObj = {};
  (0, import_deepMap.default)(object, ({ value, path }) => {
    (0, import_set.default)(newObj, path, value);
    return value;
  }, {
    privateProps: false,
    classInstances: true
  });
  return newObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
