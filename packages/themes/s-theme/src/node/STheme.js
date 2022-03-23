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
var STheme_exports = {};
__export(STheme_exports, {
  default: () => STheme
});
module.exports = __toCommonJS(STheme_exports);
var import_SThemeBase = __toESM(require("../shared/SThemeBase"), 1);
var import_s_color = __toESM(require("@coffeekraken/s-color"), 1);
class STheme extends import_SThemeBase.default {
  constructor(theme, variant) {
    super(theme, variant);
  }
  static getCurrentTheme() {
    return this.getTheme();
  }
  getColor(name, variant, state = "default") {
    const color = this.config(`color.${name}.color`);
    if (!color) {
      throw new Error(`Sorry but the requested "<yellow>${name}</yellow> color does not exists...`);
    }
    if (!variant) {
      return new import_s_color.default(color);
    }
    const variantObj = this.config(`color.${name}.${state}.${variant}`);
    if (!variantObj) {
      throw new Error(`Sorry but the requested "<yellow>${name}</yellow>"color, variant "<cyan>${variant}</cyan>" and state "<magenta>${state}</magenta>" does not exists...`);
    }
    const colorInstance = new import_s_color.default(color);
    colorInstance.apply(variantObj);
    return colorInstance;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
