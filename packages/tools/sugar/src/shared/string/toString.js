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
var toString_exports = {};
__export(toString_exports, {
  default: () => toString_default
});
module.exports = __toCommonJS(toString_exports);
var import_chalk = __toESM(require("chalk"), 1);
var import_deepMap = __toESM(require("../object/deepMap"), 1);
var import_map = __toESM(require("../is/map"), 1);
var import_array = __toESM(require("../is/array"), 1);
var import_boolean = __toESM(require("../is/boolean"), 1);
var import_function = __toESM(require("../is/function"), 1);
var import_json = __toESM(require("../is/json"), 1);
var import_object = __toESM(require("../is/object"), 1);
var import_deepMerge = __toESM(require("../object/deepMerge"), 1);
var import_mapToObject = __toESM(require("../map/mapToObject"), 1);
var import_json_cyclic = require("json-cyclic");
function fn(value, settings = {}) {
  settings = (0, import_deepMerge.default)({
    beautify: true,
    highlight: true,
    verbose: true,
    theme: {
      number: import_chalk.default.yellow,
      default: import_chalk.default.white,
      keyword: import_chalk.default.blue,
      regexp: import_chalk.default.red,
      string: import_chalk.default.whiteBright,
      class: import_chalk.default.yellow,
      function: import_chalk.default.yellow,
      comment: import_chalk.default.gray,
      variable: import_chalk.default.red,
      attr: import_chalk.default.green
    }
  }, settings);
  if (typeof value === "string")
    return value;
  if (value === null)
    return null;
  if (value === void 0)
    return void 0;
  if (value instanceof Error) {
    const errorStr = value.toString();
    const stackStr = value.stack;
    const messageStr = value.message;
    if (settings.verbose) {
      return [
        `<red>${value.constructor.name || "Error"}</red>`,
        "",
        messageStr,
        "",
        stackStr
      ].join("\n");
    }
    return errorStr;
  }
  if ((0, import_map.default)(value)) {
    value = (0, import_mapToObject.default)(value);
  }
  if ((0, import_object.default)(value) || (0, import_array.default)(value) || (0, import_json.default)(value)) {
    try {
      value = (0, import_json_cyclic.decycle)(value);
    } catch (e) {
    }
    value = (0, import_deepMap.default)(value, ({ value: value2 }) => {
      if (value2 instanceof Map)
        return (0, import_mapToObject.default)(value2);
      return value2;
    });
    let prettyString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
    prettyString = prettyString.replace(/"([^"]+)":/g, "$1:").replace(/\uFFFF/g, '\\"');
    if (settings.highlight) {
    }
    return prettyString;
  }
  if ((0, import_boolean.default)(value)) {
    if (value)
      return "true";
    else
      return "false";
  }
  if ((0, import_function.default)(value)) {
    return "" + value;
  }
  let returnString = "";
  try {
    value = (0, import_json_cyclic.decycle)(value);
    returnString = JSON.stringify(value, null, settings.beautify ? 4 : 0);
  } catch (e) {
    try {
      returnString = value.toString();
    } catch (e2) {
      returnString = value;
    }
  }
  return returnString;
}
var toString_default = fn;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
