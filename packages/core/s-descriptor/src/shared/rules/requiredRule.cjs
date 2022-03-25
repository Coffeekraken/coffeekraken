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
var requiredRule_exports = {};
__export(requiredRule_exports, {
  default: () => requiredRule_default
});
module.exports = __toCommonJS(requiredRule_exports);
const ruleObj = {
  priority: 1,
  name: "Required",
  id: "required",
  settings: {
    when: [void 0, null]
  },
  message: "This value is required",
  processParams: (params) => {
    return { value: params };
  },
  apply: (value, params, ruleSettings, settings) => {
    if (params.value === true) {
      if (ruleSettings.when.indexOf(value) !== -1) {
        return new Error("This property is <yellow>required</yellow>");
      }
    }
    return value;
  }
};
var requiredRule_default = ruleObj;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
