var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var classes_exports = {};
__export(classes_exports, {
  default: () => classes_default,
  interface: () => postcssSugarPluginPointerClassesInterface
});
module.exports = __toCommonJS(classes_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class postcssSugarPluginPointerClassesInterface extends import_s_interface.default {
  static get _definition() {
    return {};
  }
}
function classes_default({
  params,
  atRule,
  CssVars,
  replaceWith
}) {
  const finalParams = __spreadValues({}, params);
  const vars = new CssVars();
  vars.comment(() => `/**
    * @name          s-pointer-events:none
    * @namespace          sugar.css.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>none</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events:none s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--none {
        pointer-events: none;
    }`);
  vars.comment(() => `/**
    * @name          s-pointer-events:all
    * @namespace          sugar.css.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>all</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events:all s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--all {
        pointer-events: all;
    }`);
  vars.comment(() => `/**
    * @name          s-pointer-events:auto
    * @namespace          sugar.css.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>auto</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events:auto s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--auto {
        pointer-events: auto;
    }`);
  vars.comment(() => `/**
    * @name          s-pointer-events:fill
    * @namespace          sugar.css.pointer
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>fill</yellow>" pointer events style to any HTMLElement
    * 
    * @example        html
    * <div class="s-pointer-events:fill s-bg:accent">
    *     <div class="s-center-abs">I'm a cool overflow auto container</div>
    * </div>
    */
   `).code(`
    .s-pointer-events--fill {
        pointer-events: fill;
    }`);
  return vars;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  interface
});
