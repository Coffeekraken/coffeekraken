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
var handlebars_exports = {};
__export(handlebars_exports, {
  default: () => handlebars_default
});
module.exports = __toCommonJS(handlebars_exports);
var handlebars_default = {
  match: /handlebars\.js/,
  rewrite(src, id) {
    return src.replace("if (global.Symbol && context[global.Symbol.iterator])", "if (false)");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
