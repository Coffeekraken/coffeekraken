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
var stripCssComments_exports = {};
__export(stripCssComments_exports, {
  default: () => stripCssComments_default
});
module.exports = __toCommonJS(stripCssComments_exports);
var import_deepMerge = __toESM(require("../object/deepMerge"));
var import_strip_css_comments = __toESM(require("strip-css-comments"));
function stripCssComments(css, settings = {}) {
  settings = (0, import_deepMerge.default)({
    block: true,
    line: true
  }, settings);
  if (settings.block) {
    css = (0, import_strip_css_comments.default)(css, {
      preserve: false
    });
  }
  if (settings.line) {
    css = css.replace(/^[\s]{0,99999999}\/\/.*$/gm, "");
  }
  return css;
}
var stripCssComments_default = stripCssComments;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
