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
var styleString2Object_exports = {};
__export(styleString2Object_exports, {
  default: () => styleString2Object_default
});
module.exports = __toCommonJS(styleString2Object_exports);
var import_camelize = __toESM(require("../../shared/string/camelize"), 1);
var import_autoCast = __toESM(require("../../shared/string/autoCast"), 1);
function styleString2Object(style) {
  if (!style || style === "")
    return {};
  const obj = {};
  const split = style.replace(/\s/g, "").split(";");
  split.forEach((statement) => {
    const spl = statement.split(":"), key = (0, import_camelize.default)(spl[0]), value = spl[1];
    obj[key] = (0, import_autoCast.default)(value);
  });
  return obj;
}
var styleString2Object_default = styleString2Object;
