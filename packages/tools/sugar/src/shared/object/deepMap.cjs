var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var deepMap_exports = {};
__export(deepMap_exports, {
  default: () => deepMap_default
});
module.exports = __toCommonJS(deepMap_exports);
var import_plainObject = __toESM(require("../is/plainObject"), 1);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
var import_classInstance = __toESM(require("../is/classInstance"), 1);
function deepMap(objectOrArray, processor, settings = {}, _path = []) {
  settings = (0, import_deepMerge.default)({
    classInstances: false,
    array: true,
    privateProps: false,
    cloneFirst: true
  }, settings);
  const isArray = Array.isArray(objectOrArray);
  let newObject = isArray ? [] : settings.cloneFirst ? Object.assign({}, objectOrArray) : objectOrArray;
  Object.keys(objectOrArray).forEach((prop) => {
    if (!settings.privateProps && prop.match(/^_/))
      return;
    if ((0, import_plainObject.default)(objectOrArray[prop]) || (0, import_classInstance.default)(objectOrArray[prop]) && settings.classInstances || Array.isArray(objectOrArray[prop]) && settings.array) {
      const res2 = deepMap(objectOrArray[prop], processor, settings, [
        ..._path,
        prop
      ]);
      if (isArray) {
        newObject.push(res2);
      } else {
        if (prop === "..." && (0, import_plainObject.default)(res2)) {
          newObject = __spreadValues(__spreadValues({}, newObject), res2);
        } else {
          newObject[prop] = res2;
        }
      }
      return;
    }
    const res = processor({
      object: objectOrArray,
      prop,
      value: objectOrArray[prop],
      path: [..._path, prop].join(".")
    });
    if (res === -1) {
      delete objectOrArray[prop];
      return;
    }
    if (isArray)
      newObject.push(res);
    else {
      if (prop === "..." && (0, import_plainObject.default)(res)) {
        newObject = __spreadValues(__spreadValues({}, newObject), res);
      } else {
        newObject[prop] = res;
      }
    }
  });
  return newObject;
}
var deepMap_default = deepMap;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
