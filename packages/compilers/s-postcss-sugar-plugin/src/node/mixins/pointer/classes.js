var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import __SInterface from "@coffeekraken/s-interface";
class postcssSugarPluginPointerClassesInterface extends __SInterface {
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
export {
  classes_default as default,
  postcssSugarPluginPointerClassesInterface as interface
};
