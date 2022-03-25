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
var getStyleProperty_exports = {};
__export(getStyleProperty_exports, {
  default: () => getStyleProperty_default
});
module.exports = __toCommonJS(getStyleProperty_exports);
var import_camelize = __toESM(require("../../../shared/string/camelize"));
var import_autoCast = __toESM(require("../../../shared/string/autoCast"));
function getStyleProperty(elm, property) {
  setTimeout(() => {
    elm._sComputedStyle = null;
  });
  const computed = elm._sComputedStyle || window.getComputedStyle(elm);
  elm._sComputedStyle = computed;
  const prefixes = ["", "webkit-", "moz-", "ms-", "o-", "khtml-"];
  for (let i = 0; i < prefixes.length; i++) {
    const prefix = prefixes[i];
    const value = computed[(0, import_camelize.default)(`${prefix}${property}`)];
    if (value && value.trim() !== "")
      return (0, import_autoCast.default)(value);
  }
  return null;
}
var getStyleProperty_default = getStyleProperty;
