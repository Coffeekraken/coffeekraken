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
var argsToString_exports = {};
__export(argsToString_exports, {
  default: () => argsToString_default
});
module.exports = __toCommonJS(argsToString_exports);
var import_toString = __toESM(require("../string/toString"), 1);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
var import_plainObject = __toESM(require("../is/plainObject"), 1);
function argsToString(args, settings = {}) {
  settings = (0, import_deepMerge.default)({
    valueQuote: '"',
    keepFalsy: false
  }, settings);
  function processParam(param, value) {
    const finalKey = param.length > 1 ? `--${param}` : `-${param}`;
    if (value === true)
      return `${finalKey}`;
    if (value === false && settings.keepFalsy)
      return `${finalKey} false`;
    if (!value)
      return "";
    let valueStr = value.toString !== void 0 && typeof value.toString === "function" ? value.toString() : (0, import_toString.default)(value);
    if (settings.valueQuote === '"')
      valueStr = valueStr.replace(/"/g, '\\"');
    if (settings.valueQuote === "'")
      valueStr = valueStr.replace(/'/g, "\\'");
    if (settings.valueQuote === "`")
      valueStr = valueStr.replace(/`/g, "\\`");
    return `${finalKey} ${settings.valueQuote}${valueStr}${settings.valueQuote}`;
  }
  let string = "";
  Object.keys(args).forEach((key) => {
    const argValue = args[key];
    let str = "";
    if (Array.isArray(argValue)) {
      argValue.forEach((value) => {
        string += ` ${processParam(key, value)}`;
      });
    } else if ((0, import_plainObject.default)(argValue)) {
      let valueStr = JSON.stringify(argValue);
      string += ` ${processParam(key, valueStr)}`;
    } else {
      string += ` ${processParam(key, argValue)}`;
    }
  });
  return string.replace(/(\s){2,999999}/gm, " ").trim();
}
var argsToString_default = argsToString;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
