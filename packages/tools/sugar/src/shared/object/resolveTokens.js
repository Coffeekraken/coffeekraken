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
var resolveTokens_exports = {};
__export(resolveTokens_exports, {
  default: () => resolveTokens_default
});
module.exports = __toCommonJS(resolveTokens_exports);
var import_deepProxy = __toESM(require("./deepProxy"), 1);
var import_get = __toESM(require("./get"), 1);
function resolveTokens(object) {
  const proxiedObject = (0, import_deepProxy.default)(object, (getObj) => {
    const rawValue = (0, import_get.default)(getObj.target, getObj.key);
    if (typeof rawValue !== "string")
      return rawValue;
    const reg = /\{([a-zA-Z0-9\.-_]+)\}/g;
    const tokens = rawValue.match(reg);
    let finalValue = rawValue;
    if (!tokens)
      return rawValue;
    tokens.forEach((token) => {
      finalValue = finalValue.replace(token, (0, import_get.default)(object, token.replace("{", "").replace("}", "").replace("this.", "")));
    });
    return finalValue;
  }, {
    handleGet: true
  });
  return proxiedObject;
}
var resolveTokens_default = resolveTokens;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
