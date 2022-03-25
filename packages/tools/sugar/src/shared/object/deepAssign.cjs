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
var deepAssign_exports = {};
__export(deepAssign_exports, {
  default: () => deepAssign
});
module.exports = __toCommonJS(deepAssign_exports);
var import_unique = __toESM(require("../array/unique"));
var import_plainObject = __toESM(require("../is/plainObject"));
var import_clone = __toESM(require("./clone"));
function deepAssign(referenceObj, ...objects) {
  const settings = {
    array: false,
    object: true,
    cloneChilds: true
  };
  function merge(refObj, mixWithObj) {
    for (const key of Object.keys(mixWithObj)) {
      if (settings.array === true && Array.isArray(refObj[key]) && Array.isArray(mixWithObj[key])) {
        const newArray = (0, import_unique.default)([...refObj[key], ...mixWithObj[key]]);
        refObj[key] = newArray;
        continue;
      }
      if (settings.object === true && (0, import_plainObject.default)(refObj[key]) && (0, import_plainObject.default)(mixWithObj[key])) {
        refObj[key] = merge(refObj[key], mixWithObj[key]);
        continue;
      }
      if ((0, import_plainObject.default)(mixWithObj[key]) && settings.cloneChilds) {
        refObj[key] = (0, import_clone.default)(mixWithObj[key], {
          deep: true
        });
      } else {
        refObj[key] = mixWithObj[key];
      }
    }
    return refObj;
  }
  const potentialSettingsObj = objects[objects.length - 1] || {};
  if (potentialSettingsObj.array && typeof potentialSettingsObj.array === "boolean" || potentialSettingsObj.object && typeof potentialSettingsObj.object === "boolean") {
    if (potentialSettingsObj.array !== void 0)
      settings.array = potentialSettingsObj.array;
    if (potentialSettingsObj.object !== void 0)
      settings.object = potentialSettingsObj.object;
    objects.pop();
  }
  for (let i = 0; i < objects.length; i++) {
    const toMergeObj = objects[i] || {};
    merge(referenceObj, toMergeObj);
  }
  return referenceObj;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
