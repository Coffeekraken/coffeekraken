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
var whenAttribute_exports = {};
__export(whenAttribute_exports, {
  default: () => whenAttribute_default
});
module.exports = __toCommonJS(whenAttribute_exports);
var import_autoCast = __toESM(require("../../../shared/string/autoCast"), 1);
var import_observeAttributes = __toESM(require("../observe/observeAttributes"), 1);
function whenAttribute(elm, attrName, checkFn = null) {
  return new Promise((resolve, reject) => {
    if (elm.hasAttribute(attrName)) {
      const value = (0, import_autoCast.default)(elm.getAttribute(attrName));
      if (checkFn && checkFn(value, value)) {
        resolve(value);
        return;
      } else if (!checkFn) {
        resolve(value);
        return;
      }
    }
    const obs = (0, import_observeAttributes.default)(elm).then((mutation) => {
      if (mutation.attributeName === attrName) {
        const value = (0, import_autoCast.default)(mutation.target.getAttribute(mutation.attributeName));
        if (checkFn && checkFn(value, mutation.oldValue)) {
          resolve(value);
          obs.cancel();
        } else if (!checkFn) {
          resolve(value);
          obs.cancel();
        }
      }
    });
  });
}
var whenAttribute_default = whenAttribute;
