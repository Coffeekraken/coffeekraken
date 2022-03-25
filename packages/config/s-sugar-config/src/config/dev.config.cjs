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
var dev_config_exports = {};
__export(dev_config_exports, {
  default: () => dev_config_default
});
module.exports = __toCommonJS(dev_config_exports);
var dev_config_default = {
  colors: {
    yellow: "#ffdc89",
    cyan: "#65c1cd",
    green: "#a7cb8b",
    magenta: "#d190e3",
    red: "#e78287",
    blue: "#71bdf2",
    primary: "#ffdc89",
    secondary: "#65c1cd",
    grey: "#e2e5e9",
    gray: "#e2e5e9",
    black: "#343a43",
    white: "#e2e5e9"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
