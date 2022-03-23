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
var menu_exports = {};
__export(menu_exports, {
  default: () => menu_default
});
module.exports = __toCommonJS(menu_exports);
var import_urlFromString = __toESM(require("@coffeekraken/sugar/shared/url/urlFromString"), 1);
function menuTag(data, blockSettings) {
  if (data && data.value && typeof data.value === "string") {
    const parts = data.value.split(/\s{2,20000}/).map((l) => l.trim());
    let slug;
    if (parts.length > 1) {
      slug = parts[1];
    } else {
      slug = parts[0].split("/").map((l) => {
        return (0, import_urlFromString.default)(l);
      });
    }
    return {
      tree: parts[0].split("/").map((l) => l.trim()),
      slug
    };
  }
  return data.value;
}
var menu_default = menuTag;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
