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
var namespace_exports = {};
__export(namespace_exports, {
  default: () => namespace_default
});
module.exports = __toCommonJS(namespace_exports);
var import_namespaceCompliant = __toESM(require("@coffeekraken/sugar/shared/string/namespaceCompliant"));
function namespace(data, blockSettings) {
  if (data && data.value && typeof data.value === "string" && data.value.trim() === "") {
    return true;
  }
  let namespace2 = data.value;
  if (!namespace2)
    return data.value;
  if (blockSettings.packageJson) {
    namespace2 = (0, import_namespaceCompliant.default)(`${blockSettings.packageJson.name.replace("/", ".")}.${namespace2.replace(/\s{1,9999999}/gm, "-")}`);
  }
  return (0, import_namespaceCompliant.default)(namespace2.replace(/\s{1,999999}/gm, "-"));
}
var namespace_default = namespace;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
