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
var docblocks_exports = {};
__export(docblocks_exports, {
  default: () => docblocks_default,
  interface: () => postcssSugarPluginDocblockColorsMixinInterface
});
module.exports = __toCommonJS(docblocks_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_theme = __toESM(require("@coffeekraken/s-theme"));
class postcssSugarPluginDocblockColorsMixinInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function docblocks_default({ params, atRule, CssVars, replaceWith }) {
  const vars = new CssVars();
  const colorsObj = import_s_theme.default.config("color");
  const colors = Object.keys(colorsObj);
  colors.forEach((colorName) => {
    const colorObj = colorsObj[colorName];
    Object.keys(colorObj).forEach((modifier) => {
      const colorValue = colorObj[modifier];
      vars.comment(() => [
        `/**`,
        ` * @name 		    ${colorName}`,
        ` * @modifier        ${modifier}`,
        ` * @namespace       sugar.css.theme.${import_s_theme.default.name}.colors`,
        ` * @type            color`,
        ` * @platform       css`,
        ` * @status         stable`,
        ` *`,
        ` * This is the "${colorName}${modifier !== "default" ? `-${modifier}` : ""}" registered color`,
        ` *`,
        ` * @color 		${colorValue}`,
        ` */`
      ].join("\n"));
    });
  });
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
