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
var param_exports = {};
__export(param_exports, {
  default: () => param_default
});
module.exports = __toCommonJS(param_exports);
var import_parse = __toESM(require("@coffeekraken/sugar/shared/string/parse"));
var import_upperFirst = __toESM(require("@coffeekraken/sugar/shared/string/upperFirst"));
function param(data, blockSettings) {
  if (!Array.isArray(data))
    data = [data];
  const res = {};
  data.forEach((param2) => {
    if (typeof param2 !== "object" || !param2.value || typeof param2.value !== "string")
      return;
    const parts = param2.value.split(/\s{2,20000}/).map((l) => l.trim());
    let type = parts && parts[0] ? (0, import_upperFirst.default)(parts[0].replace("{", "").replace("}", "")) : null;
    const variable = parts && parts[1] ? parts[1] : null;
    const description = new String(parts && parts[2] ? parts[2] : null);
    description.render = true;
    let name = variable;
    let defaultValue = void 0;
    let defaultValueStr = "";
    let variableMatch = null;
    if (variable && typeof variable === "string")
      variableMatch = variable.match(/^\[(.*)\]$/);
    if (type && type.includes("|")) {
      type = type.split("|").map((l) => (0, import_upperFirst.default)(l.trim()));
    } else {
      type = [type];
    }
    if (variableMatch) {
      const variableParts = variableMatch[1].split("=");
      if (variableParts.length === 2) {
        name = variableParts[0].trim();
        defaultValueStr = variableParts[1].trim();
        defaultValue = (0, import_parse.default)(variableParts[1].trim());
      }
    }
    res[name] = {
      name,
      type,
      description,
      default: defaultValue,
      defaultStr: defaultValueStr
    };
    if (param2.content)
      res[name].content = param2.content.join("\n");
  });
  return res;
}
var param_default = param;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
