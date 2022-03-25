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
var delete_exports = {};
__export(delete_exports, {
  default: () => delete_default
});
module.exports = __toCommonJS(delete_exports);
var import_set = __toESM(require("./set"));
function del(object, dotPath) {
  const parentDotPath = dotPath.split(".").slice(0, -1).join(".");
  if (!dotPath || dotPath === "" || dotPath === ".")
    return object;
  dotPath = dotPath.replace(/\[(\w+)\]/g, ".$1");
  dotPath = dotPath.replace(/^\./, "");
  const a = dotPath.split(".");
  let o = object;
  while (a.length) {
    const n = a.shift();
    if (a.length < 1) {
      if (Array.isArray(o)) {
        const valueToDelete = o[n];
        o = o.filter((v) => {
          return v !== valueToDelete;
        });
      } else {
        delete o[n];
      }
      (0, import_set.default)(object, parentDotPath, o);
    } else {
      o = o[n];
    }
  }
  return object;
}
var delete_default = del;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
