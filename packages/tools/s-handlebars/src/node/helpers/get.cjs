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
var get_exports = {};
__export(get_exports, {
  default: () => get
});
module.exports = __toCommonJS(get_exports);
var import_get = __toESM(require("@coffeekraken/sugar/shared/object/get"));
function get(object, path, resolveDots = true, insidePath = null) {
  if (typeof insidePath !== "string")
    insidePath = null;
  let res;
  if (resolveDots) {
    res = (0, import_get.default)(object, path);
  } else {
    res = object[path];
  }
  if (insidePath) {
    return (0, import_get.default)(res, insidePath);
  }
  return res;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
