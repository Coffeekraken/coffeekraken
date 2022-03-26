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
var typeof_exports = {};
__export(typeof_exports, {
  default: () => typeof_default
});
module.exports = __toCommonJS(typeof_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
var import_integer = __toESM(require("../is/integer"), 1);
var import_class = __toESM(require("../is/class"), 1);
var import_upperFirst = __toESM(require("../string/upperFirst"), 1);
function typeOf(value, settings = {}) {
  settings = (0, import_deepMerge.default)({
    of: false,
    customClass: true
  }, settings);
  let type;
  if (Array.isArray(value))
    type = "Array";
  else if (value instanceof Map)
    type = "Map";
  else if (value === null)
    type = "Null";
  else if (value === void 0)
    type = "Undefined";
  else if (typeof value === "string")
    type = "String";
  else if ((0, import_integer.default)(value))
    type = "Integer";
  else if (typeof value === "number")
    type = "Number";
  else if (typeof value === "boolean")
    type = "Boolean";
  else if (value instanceof RegExp)
    type = "RegExp";
  else if (settings.customClass === true && (0, import_class.default)(value) && value.name !== void 0) {
    type = (0, import_upperFirst.default)(value.name);
  } else if (settings.customClass === true && value.constructor !== void 0 && value.constructor.name !== void 0) {
    type = (0, import_upperFirst.default)(value.constructor.name);
  } else if (settings.customClass === false && (0, import_class.default)(value)) {
    type = "Class";
  } else if (typeof value === "function")
    type = "Function";
  else if (typeof value === "object")
    type = "Object";
  else
    type = "Unknown";
  const avoidTypes = [
    "Null",
    "Undefined",
    "String",
    "Integer",
    "Number",
    "Boolean",
    "Unknown"
  ];
  if (settings.of === true && !avoidTypes.includes(type)) {
    const loopOn = Array.isArray(value) ? [...value.keys()] : Object.keys(value);
    const receivedTypes = [];
    loopOn.forEach((valueIndex) => {
      const valueToCheck = value[valueIndex];
      const childType = typeOf(valueToCheck, {
        of: false,
        customClass: settings.customClass
      });
      if (!receivedTypes.includes(childType)) {
        receivedTypes.push(childType);
      }
    });
    type += `<${receivedTypes.join("|")}>`;
  }
  return type;
}
var typeof_default = typeOf;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
