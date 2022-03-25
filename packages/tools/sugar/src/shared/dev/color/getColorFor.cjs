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
var getColorFor_exports = {};
__export(getColorFor_exports, {
  default: () => getColorFor
});
module.exports = __toCommonJS(getColorFor_exports);
var import_md5 = __toESM(require("../../crypt/md5"));
var import_availableColors = __toESM(require("./availableColors"));
var import_pickRandom = __toESM(require("../../array/pickRandom"));
var import_deepMerge = __toESM(require("../../object/deepMerge"));
const _colorUsedByScope = {};
const _colorsStack = {};
function getColorFor(ref, settings) {
  settings = (0, import_deepMerge.default)({
    scope: "default",
    excludeBasics: true
  }, settings != null ? settings : {});
  const availableColors = (0, import_availableColors.default)(settings);
  const scopeId = import_md5.default.encrypt(settings.scope);
  const refId = import_md5.default.encrypt(ref);
  if (_colorsStack[`${scopeId}.${refId}`])
    return _colorsStack[`${scopeId}.${refId}`];
  if (!_colorUsedByScope[scopeId])
    _colorUsedByScope[scopeId] = [];
  if (_colorUsedByScope[scopeId].length >= availableColors.length) {
    const color = (0, import_pickRandom.default)(availableColors);
    _colorsStack[`${scopeId}.${refId}`] = color;
    return color;
  } else {
    for (let i = 0; i < availableColors.length; i++) {
      if (_colorUsedByScope[scopeId].indexOf(availableColors[i]) === -1) {
        _colorUsedByScope[scopeId].push(availableColors[i]);
        _colorsStack[`${scopeId}.${refId}`] = availableColors[i];
        return availableColors[i];
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
