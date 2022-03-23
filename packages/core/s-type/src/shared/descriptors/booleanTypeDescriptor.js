var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var booleanTypeDescriptor_exports = {};
__export(booleanTypeDescriptor_exports, {
  default: () => booleanTypeDescriptor_default
});
module.exports = __toCommonJS(booleanTypeDescriptor_exports);
const descriptor = {
  name: "Boolean",
  id: "boolean",
  is: (value) => typeof value === "boolean",
  cast: (value, params = {}) => {
    if (value !== false && params && params.nullishAsTrue && !value) {
      return true;
    }
    if (typeof value === "boolean")
      return value;
    if (value === null || value === void 0)
      return false;
    if (typeof value === "number") {
      if (value > 0)
        return true;
      return false;
    }
    if (typeof value === "string") {
      return value.length > 0 ? true : false;
    }
    if (Array.isArray(value)) {
      if (value.length > 0)
        return true;
      return false;
    }
    if (typeof value === "object") {
      return Object.keys(value).length > 0 ? true : false;
    }
    return new Error([
      `Sorry but for now only these types can be casted to boolean:`,
      "- <yellow>null</yellow>: Will be casted as <red>false</red>",
      "- <yellow>undefined</yellow>: Will be casted as <red>false</red>",
      "- <yellow>Number</yellow>: Will be casted as <green>true</green> when greater than 0, <red>false</red> otherwise",
      "- <yellow>String</yellow>: Will be casted as <green>true</green> when longer than 0 characters, <red>false</red> otherwise",
      "- <yellow>Array</yellow>: Will be casted as <green>true</green> when having more than 0 items, <red>false</red> otherwise",
      "- <yellow>Object</yellow>: Will be casted as <green>true</green> when have more than 0 properties, <red>false</red> otherwise"
    ].join("\n"));
  }
};
var booleanTypeDescriptor_default = descriptor;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
