import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var styleObject2String_exports = {};
__export(styleObject2String_exports, {
  default: () => styleObject2String_default
});
module.exports = __toCommonJS(styleObject2String_exports);
var import_uncamelize = __toESM(require("../../shared/string/uncamelize"), 1);
function styleObject2String(styleObj) {
  const propertiesArray = [];
  for (const key in styleObj) {
    const value = styleObj[key];
    if (value === void 0 || value === "") {
      delete styleObj[key];
    } else {
      propertiesArray.push(`${(0, import_uncamelize.default)(key)}:${value};`);
    }
  }
  return propertiesArray.join(" ");
}
var styleObject2String_default = styleObject2String;
